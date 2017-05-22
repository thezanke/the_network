import React from 'react';

import styles from './Article.css';

const Article = ({ headline, url }) => (
  <li className={styles.article}>
    <a href={url}>{headline}</a>
  </li>
);

export default Article;
