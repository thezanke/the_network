import React from 'react';

import Comments from 'components/Comments';

import styles from './Article.css';

const Article = ({ article: { id, headline, url }, showComments }) => (
  <div className={styles.article}>
    <div>
      <a href={url}>{headline}</a>
    </div>
    <Comments articleId={id} />
    <div className={styles.controls}>
      <button onClick={showComments}>Show Comments</button>
    </div>
  </div>
);

export default Article;
