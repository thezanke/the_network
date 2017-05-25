import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleList from 'components/ArticleList/ArticleList';
import { fetchArticles, articlesData, articlesLoading } from 'modules/articles';

const mapStateToProps = state => ({
  articles: articlesData(state),
  loading: articlesLoading(state)
});

@connect(mapStateToProps, { fetchArticles })
export default class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.fetchArticles();
  }

  getChildProps = () => ({
    articles: this.props.articles,
    loading: this.props.loading
  });

  render() {
    return <ArticleList {...this.getChildProps()} />;
  }
}
