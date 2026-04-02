import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = express.Router();

const PRICE_LIST = {
  shirt: {
    ironing: 10,
    wash: 15,
    drycleaning: 50,
    dyeing: 70,
  },
  pants: {
    ironing: 10,
    wash: 15,
    drycleaning: 50,
    dyeing: 70,
  },
  sarees: {
    ironing: 10,
    wash: 15,
    drycleaning: 50,
    dyeing: 70,
  },
};

const ITEM_ALIASES = {
  shirt: "shirt",
  shirts: "shirt",
  pant: "pants",
  pants: "pants",
  trouser: "pants",
  trousers: "pants",
  saree: "sarees",
  sarees: "sarees",
  sari: "sarees",
  saris: "sarees",
};

const SERVICE_ALIASES = {
  ironing: "ironing",
  iron: "ironing",
  press: "ironing",
  pressed: "ironing",
  wash: "wash",
  washing: "wash",
  drycleaning: "drycleaning",
  "dry cleaning": "drycleaning",
  dryclean: "drycleaning",
  "dry clean": "drycleaning",
  dye: "dyeing",
  dyeing: "dyeing",
};

const normalizeText = (value = "") => value.toString().trim().toLowerCase();
const normalizeService = (service = "") => SERVICE_ALIASES[normalizeText(service)] || null;
const normalizeItem = (itemType = "") => ITEM_ALIASES[normalizeText(itemType)] || null;

const safeNumber = (value, fallback = 1) => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

const parseWithRules = (text = "") => {
  const normalized = normalizeText(text);
  const service =
    Object.keys(SERVICE_ALIASES).find((token) => normalized.includes(token)) || null;

  const items = Object.keys(ITEM_ALIASES)
    .filter((token) => normalized.includes(token))
    .map((token) => ({ type: ITEM_ALIASES[token], qty: 1 }));

  const dedupedItems = Object.values(
    items.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = { ...item };
      }
      return acc;
    }, {})
  );

  return {
    items: dedupedItems,
    service: service ? SERVICE_ALIASES[service] : null,
  };
};

const getAiClient = () => {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }

  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
};

const extractOrderWithAI = async (text) => {
  const client = getAiClient();
  if (!client) {
    return null;
  }

  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
    max_tokens: 200,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Extract items and service from this laundry order:\n\n"${text}"\n\nReturn ONLY valid JSON in this exact schema:\n{\n  "items": [{ "type": "shirt", "qty": 1 }],\n  "service": "ironing"\n}`,
      },
    ],
  });

  let result = response.content?.[0]?.text || "";
  result = result.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(result);
};

router.post("/price", async (req, res) => {
  try {
    const { text } = req.body || {};

    if (!text || typeof text !== "string") {
      return res.status(400).json({ message: "Please provide order text." });
    }

    let parsed = null;

    try {
      parsed = await extractOrderWithAI(text);
    } catch (aiError) {
      console.warn("AI parsing failed, falling back to rule parsing:", aiError.message);
    }

    const fallbackParsed = parseWithRules(text);

    const rawItems = Array.isArray(parsed?.items) ? parsed.items : fallbackParsed.items;
    const normalizedItems = rawItems
      .map((item) => ({
        type: normalizeItem(item?.type),
        qty: safeNumber(item?.qty, 1),
      }))
      .filter((item) => item.type);

    const normalizedService = normalizeService(parsed?.service) || fallbackParsed.service;

    if (!normalizedService) {
      return res.status(400).json({
        message: "Could not detect service. Try: ironing, wash, dry cleaning, or dyeing.",
      });
    }

    if (normalizedItems.length === 0) {
      return res.status(400).json({
        message: "Could not detect any supported item. Try: shirt, pants, or sarees.",
      });
    }

    let total = 0;
    normalizedItems.forEach((item) => {
      const price = PRICE_LIST[item.type]?.[normalizedService] || 0;
      total += price * item.qty;
    });

    return res.json({
      items: normalizedItems,
      service: normalizedService,
      total,
      message: `${normalizedItems.map((i) => `${i.qty} ${i.type}`).join(", ")} for ${normalizedService} will cost ₹${total}`,
    });
  } catch (err) {
    console.error("AI route error:", err);
    return res.status(500).json({
      message: "Unable to calculate price right now.",
      error: err.message,
    });
  }
});

export default router;
