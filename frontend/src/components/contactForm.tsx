import { useTranslation } from "react-i18next";
import { useState } from "react";
const ContactUsForm = () => {
    const { t } = useTranslation();
    const [submitting, setSubmitting] = useState(false);
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone")),
        message: String(formData.get("message")),
    };

    if (submitting) return;

    setSubmitting(true);

    try {
        const res = await fetch("https://lewis-cleaners.onrender.com/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        if (!res.ok) {
        throw new Error("Failed");
        }

        alert("Form submitted successfully!");
        e.currentTarget.reset();
    } catch (err) {
        alert("Something went wrong");
        console.error(err);
    } finally {
        setSubmitting(false);
    }
    };
    return (
    <div className="heroForm">
        <form name="contact" onSubmit={handleSubmit}>
            <div className="input-field">
                <input type="text" name="name" placeholder={t("contactForm.name")} />
                <span className="error">{t("contactForm.nameError")}</span>
            </div>
            <div className="input-field">
                <input type="email" name="email" placeholder={t("contactForm.email")} />
                <span className="error">{t("contactForm.emailError")}</span>
            </div>
            <div className="input-field">
                <input type="tel" name="phone" placeholder={t("contactForm.telephone")} />
                <span className="error">{t("contactForm.telError")}</span>
            </div>
            <div className="input-field">
                <textarea name="message" placeholder={t("contactForm.message")}></textarea>
                <span className="error">{t("contactForm.message")}</span>
            </div>
            <button disabled={submitting} className="btn btn-primary" type="submit">{submitting ? "Submitting..." : t("contactForm.formCta")}</button>
        </form>
    </div>
    );
};

export default ContactUsForm;