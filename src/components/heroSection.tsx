import videomp4 from '../assets/ironing-video.mp4';
import videowebm from '../assets/ironing-video.webm';
import { useTranslation } from "react-i18next";

type HeroProps = {
  onCTAClick: () => void;
};

const HeroSection = ({ onCTAClick }: HeroProps) => {
    const { t } = useTranslation();
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
                        <h1>{t("hero.title")}</h1>
                        <p>{t("hero.subtitle")}</p>
                        <p>{t("hero.description")}</p>

                        <div className="hero-buttons">
                        <a href="tel:+919224337095" className="btn btn-primary mx-3">
                            {t("hero.callCta")}
                        </a>
                        <button className="btn btn-outline-primary" onClick={onCTAClick}>
                            {t("hero.findCta")}
                        </button>
                    </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;