import React from 'react';

import Comments from 'components/Comments';

import styles from './Article.css';

const Article = ({ article, showComments }) =>
  <div className={styles.article}>
    <div>
      <a href={article.url}>{article.headline}</a>
    </div>
    <div className={styles.controls}>
      <button onClick={showComments}>Show Comments</button>
    </div>
    <Comments articleId={article.id} />
  </div>;

export default Article;
