import React from 'react';

import Article from 'components/Article';
import styles from './ArticleList.css';

const ArticleList = ({ articles, loading, fetchComments }) => {
  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (!articles) {
    return <div>Articles could not be loaded.</div>;
  }

  return (
    <div className={styles.container}>
      {articles.length > 0
        ? <div className={styles.list}>
            {articles.map(article => (
              <Article
                key={article.id}
                article={article}
                showComments={() => fetchComments(article.id)}
              />
            ))}
          </div>
        : <div>No articles</div>}
    </div>
  );
};
export default ArticleList;
