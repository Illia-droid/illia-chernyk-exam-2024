import React, { useState, useRef, useEffect } from 'react';
import styles from './Question.module.scss';

const Question = ({ faq: { question, answer } }) => {
  const [select, setSelect] = useState(false);
  const wrapRef = useRef(null);

  const handleAnswer = () => {
    setSelect(!select);
  };

  useEffect(() => {
    if (select) {
      wrapRef.current.style.maxHeight = `${wrapRef.current.scrollHeight}px`;
      wrapRef.current.style.opacity = '1';
    } else {
      wrapRef.current.style.maxHeight = '0px';
      wrapRef.current.style.opacity = '0';
    }
  }, [select]);

  return (
    <li
      className={styles[select ? 'faqItemActive' : 'faqItem']}
      onClick={handleAnswer}
    >
      <div className={styles.faqContainer}>
        <h4>{question}</h4>
        <div ref={wrapRef} className={styles.wrap}>
          <p dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      </div>
    </li>
  );
};

export default Question;
