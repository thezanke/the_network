import React from 'react';

import Footer from 'components/Footer';
import Header from 'components/Header';
import ArticleList from 'components/ArticleList';

export default ({ channel, loading }) => {
  if (loading) return <div>Loading channel...</div>;
  if (!channel) return <div>Channel could not be loaded.</div>;

  return (
    <div>
      <Header channel={channel} />
      <ArticleList channel={channel} />
      <Footer />
    </div>
  );
};
