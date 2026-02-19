import React from "react";
import "../styles/history-timeline.less";

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: "1994",
    title: "Business Started",
    description:
      "Started as a small family-run laundry with one washing machine and a lot of hard work.",
  },
  {
    year: "1998",
    title: "Growing Trust",
    description:
      "Became a trusted name in the neighborhood with regular customers.",
  },
  {
    year: "2001",
    title: "New Services Added",
    description:
      "Introduced ironing, pressing, and special care for delicate garments.",
  },
  {
    year: "2024",
    title: "Serving Generations",
    description:
      "Proudly serving families across generations with honesty and care.",
  },
];

const HistoryTimeline: React.FC = () => {
  return (
    <section className="history-section">
      <div className="container">
        <h2 className="section-title">Our Journey</h2>

        <div className="timeline">
          {milestones.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
