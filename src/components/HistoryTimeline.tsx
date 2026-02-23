import React from "react";
import "../styles/history-timeline.less";
import { useTranslation } from "react-i18next";

interface Milestone {
  year: string;
}

const milestones: Milestone[] = [
  {
    year: "1994"
  },
  {
    year: "1998"
  },
  {
    year: "2001"
  },
  {
    year: "2024"
  },
];

const HistoryTimeline: React.FC = () => {
  const { t } = useTranslation();
  const journey = t("journey.years", {
    returnObjects: true,
    }) as {
        journeyTitle: string;
        journeyDesc: string;
    }[];
  return (
    <section className="history-section">
      <div className="container">
        <h2 className="section-title">{t("journey.title")}</h2>

        <div className="timeline">
          {milestones.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="year">{item.year}</span>
                <h4>{journey[index]?.journeyTitle}</h4>
                <p>{journey[index]?.journeyDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
