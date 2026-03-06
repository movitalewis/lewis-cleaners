import React from "react";
import "../styles/testimonials.less";
import { useTranslation } from "react-i18next";

interface Testimonial {
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    rating: 5,
  },
  {
    rating: 4,
  },
  {
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const testimonials = t("testimonials.cards", {
    returnObjects: true,
    }) as {
        testimonial: string;
        name: string;
    }[];
  return (
    <section className="testimonials-section bg-light">
      <div className="container">
        <h2 className="section-title">{t("testimonials.title")}</h2>

        <div className="row">
          {testimonialsData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="testimonial-card">
                <div className="stars">
                  {"★".repeat(item.rating)}
                </div>

                <p className="feedback">“{testimonials[index]?.testimonial}”</p>
                <p className="name">— {testimonials[index]?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
