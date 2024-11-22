import React from "react";
import StepItem from "./StepItem";
import styles from "./HowDoNamingContestWork.module.scss";
import data from "./data.json";

const HowDoNamingContestWork = () => {
  const renderSteps = (step, i) => <StepItem key={i} step={step} />;
  return (
    <section className={styles.homeBlock}>
      <div className={styles.container}>
        <div className={styles.homeBlockCaption}>
          <img className={styles.workImage} src="./icon-27.svg" alt="Cup" />
          <h3>How Do Naming Contests Work?</h3>
        </div>
        <div className={styles.flexBox}>{data.map(renderSteps)}</div>
      </div>
    </section>
  );
};

export default HowDoNamingContestWork;
