import React from 'react';

import ArticleList from 'components/ArticleList';
import Footer from 'components/Footer';
import Header from 'components/Header';

import styles from './App.css';

export default ({ channel, loading }) => {
  if (loading) return <div>Loading channel...</div>;
  if (!channel) return <div>Channel could not be loaded.</div>;

  return (
    <div className={styles.container}>
      <Header />
      <ArticleList />
      <Footer />
    </div>
  );
};
