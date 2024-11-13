import React, { useState } from 'react';
import QuestionsBlock from './QuestionsBlock';
import Tab from './Tab';
import styles from './FrequentlyAskedQuestions.module.scss';
import data from './data.json';

const FrequentlyAskedQuestions = () => {
  const [titleSelectTab, setTitleSelectTab] = useState('Launching A Contest');
  const setSelectTab = (title) => {
    setTitleSelectTab(title);
  };
  const renderQuestionsBlocks = (block, i) => (
    <QuestionsBlock key={i} block={block} />
  );
  const renderTabs = (tab, i) => (
    <Tab
      key={i}
      tab={tab}
      isSelectTab={tab.title === titleSelectTab}
      setSelectTab={setSelectTab}
    />
  );
  return (
    <article className={styles.faqContainer}>
      <h3 className={styles.header}>Frequently Asked Questions</h3>
      <section className={styles.faqTabs}>{data.map(renderTabs)}</section>
      <section>{data.map(renderQuestionsBlocks)}</section>
    </article>
  );
};

export default FrequentlyAskedQuestions;
