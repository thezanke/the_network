import React from 'react';

import ArticleList from 'components/ArticleList/ArticleList';

import styles from './App.css';

export default () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <ArticleList />
    </div>
  </div>
);
