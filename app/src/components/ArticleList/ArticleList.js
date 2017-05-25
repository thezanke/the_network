import React from 'react';

import Article from 'components/Article';
import styles from './ArticleList.css';

const ArticleList = ({ articles, loading }) => {
  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (!articles) {
    return <div>Articles could not be loaded.</div>;
  }

  return (
    <div className={styles.container}>
      {articles.length > 0
        ? <ul className={styles.list}>
            {articles.map(article => <Article {...article} />)}
          </ul>
        : <div>No articles</div>}
    </div>
  );
};
export default ArticleList;
