import express from "express";
import Anthropic from "@anthropic-ai/sdk";

const router = express.Router();

const client = new Anthropic({
  apiKey: "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",
});

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

router.post("/price", async (req, res) => {
  try {
    const { text } = req.body;

    // 🧠 Step 1: Ask AI to extract structured data
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Extract items and service from this laundry order:

"${text}"

Return ONLY JSON like:
{
  "items": [{ "type": "shirt", "qty": 1 }],
  "service": "ironing"
}`
        }
      ],
    });

    let result = response.content[0].text;

    // 🧼 Clean AI response
    result = result.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(result);

    // 💰 Step 2: Calculate price
    let total = 0;

    parsed.items.forEach(item => {
      const price = PRICE_LIST[item.type]?.[parsed.service] || 0;
      total += price * item.qty;
    });

    res.json({
      items: parsed.items,
      service: parsed.service,
      total,
      message: `${parsed.items.map(i => `${i.qty} ${i.type}`).join(", ")} for ${parsed.service} will cost ₹${total}`
    });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      message: "AI error",
      error: err.message
    });
  }
});

export default router;