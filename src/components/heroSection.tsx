import videomp4 from '../assets/ironing-video.mp4';
import videowebm from '../assets/ironing-video.webm';
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
        <div className="video-container">
            <video autoPlay loop muted playsInline width="100%" height="100%">
                <source src={videomp4} type="video/mp4" />
                <source src={videowebm} type="video/webm" />
                Your browser does not support the video tag.
            </video>
            <div className="video-content">
                <div className="video-text">
                    <h1>Clean Clothes. Honest Service.</h1>
                    <p>Professional Laundry Since 1994 </p>
                    <p>
                    Family-owned laundry service providing washing, ironing,
                    and special garment care with love and responsibility.
                    </p>

                    <div className="hero-buttons">
                    <a href="tel:+919224337095" className="btn btn-primary mx-3">
                        Call Now
                    </a>
                    <button className="btn btn-outline-primary">
                        Visit Our Store
                    </button>
                </div>

                </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;