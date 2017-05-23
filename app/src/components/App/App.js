import React from 'react';

import ArticleListContainer from 'components/ArticleList';

import styles from './App.css';

export default () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <ArticleListContainer />
    </div>
  </div>
);
