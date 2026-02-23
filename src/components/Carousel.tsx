import React from "react";
import slide1 from '../assets/lewis-cleaners.jpg';
import slide2 from '../assets/lewis-cleaners.jpg';
import slide3 from '../assets/lewis-cleaners.jpg';
import { useTranslation } from "react-i18next";

interface CarouselItem {
  id: number;
  image: string;
}

const carouselData: CarouselItem[] = [
  { id: 1, image: slide1 },
  { id: 2, image: slide2 },
  { id: 3, image: slide3 },
];

const Carousel: React.FC = () => {
    const { t } = useTranslation();
    const slides = t("carousel.slides", {
    returnObjects: true,
    }) as {
        title: string;
        description: string;
    }[];
  return (
    <section className="carousel-section">
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
                <img
                  src={item.image}
                  className="d-block w-100"
                  alt={slides[index]?.title}
                />

                <div className="carousel-caption">
                  <h2>{slides[index]?.title}</h2>
                  <p>{slides[index]?.description}</p>
                  <button className="btn btn-primary">
                    {t("carousel.learnMore")}
                  </button>
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