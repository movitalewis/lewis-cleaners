import React from "react";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: "Professional Laundry Services",
    description: "Clean, fresh and hygienic washing for everyday clothes.",
    image: "../src/assets/lewis-cleaners.jpg",
  },
  {
    id: 2,
    title: "Perfect Ironing & Pressing",
    description: "Crisp and wrinkle-free clothes every time.",
    image: "../src/assets/lewis-cleaners.jpg",
  },
  {
    id: 3,
    title: "Special Care for Delicates",
    description: "Sarees, suits and premium fabrics handled with care.",
    image: "../src/assets/lewis-cleaners.jpg",
  },
];

const Carousel: React.FC = () => {
  return (
    <section className="bg-light">
        <div className="container">
            <div
            id="laundryCarousel"
            className="carousel slide hero-carousel"
            data-bs-ride="carousel"
            >
            {/* Indicators */}
            <div className="carousel-indicators">
                {carouselData.map((item, index) => (
                <button
                    key={item.id}
                    type="button"
                    data-bs-target="#laundryCarousel"
                    data-bs-slide-to={index}
                    className={index === 0 ? "active" : ""}
                />
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {carouselData.map((item, index) => (
                <div
                    key={item.id}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                    <img src={item.image} className="d-block w-100" alt={item.title} />

                    <div className="carousel-caption">
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <button className="btn btn-primary">Learn More</button>
                    </div>
                </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#laundryCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" />
            </button>

            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#laundryCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" />
            </button>
            </div>
        </div>
    </section>
  );
};

export default Carousel;