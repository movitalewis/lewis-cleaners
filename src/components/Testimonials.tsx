import React from "react";
import "../styles/testimonials.less";

interface Testimonial {
  name: string;
  feedback: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Mrs. Patel",
    feedback:
      "Very reliable and affordable laundry service. Clothes are always clean and neatly pressed.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    feedback:
      "We have been using their service for years. Honest work and always on time.",
    rating: 4,
  },
  {
    name: "Anita Shah",
    feedback:
      "They handle delicate clothes with great care. Highly recommended!",
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section bg-light">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>

        <div className="row">
          {testimonialsData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="testimonial-card">
                <div className="stars">
                  {"★".repeat(item.rating)}
                </div>

                <p className="feedback">“{item.feedback}”</p>
                <p className="name">— {item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
