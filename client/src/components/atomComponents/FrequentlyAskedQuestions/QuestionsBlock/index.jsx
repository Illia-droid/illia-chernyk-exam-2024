import React from 'react';
import Question from '../Question';
import styles from './QuestionsBlock.module.scss';

const QuestionsBlock = ({ block: { title, faqs } }) => {
  const renderQuestion = (faq, i) => <Question key={i} faq={faq} />;
  return (
    <section className={styles.containerQuestionsBlocks}>
      <a name={title} href={`#${title}`} aria-hidden="true">
        <h4 className={styles.faqHeading}>{title}</h4>
      </a>

      <section className={styles.faqContainer}>
        <ul className={styles.faqInner}>{faqs.map(renderQuestion)}</ul>
      </section>
    </section>
  );
};

export default QuestionsBlock;
