import React from 'react';

import Article from 'components/Article';
import styles from './ArticleList.css';

const ArticleList = () => (
  <div className={styles.container}>
    <ul className={styles.list}>
      <Article headline="Lorem ipsum dolor sit amet." url="#" />
      <Article headline="Lorem ipsum dolor sit amet." url="#" />
      <Article headline="Lorem ipsum dolor sit amet." url="#" />
      <Article headline="Lorem ipsum dolor sit amet." url="#" />
      <Article headline="Lorem ipsum dolor sit amet." url="#" />
    </ul>
  </div>
);

export default ArticleList;
