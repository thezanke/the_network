import React from 'react';

import Comments from 'components/Comments';

import styles from './Article.css';

const Article = ({ article: { id, headline, url, showComments = true } }) => (
  <div className={styles.article}>
    <div>
      <a href={url}>{headline}</a>
    </div>
    {showComments && <Comments articleId={id} />}
  </div>
);

export default Article;
