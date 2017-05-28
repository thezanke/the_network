import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleList from 'components/ArticleList/ArticleList';
import { fetchArticles, articlesData, articlesLoading } from 'modules/articles';
import { fetchComments } from 'modules/comments';

const mapStateToProps = state => ({
  articles: articlesData(state),
  loading: articlesLoading(state)
});

@connect(mapStateToProps, { fetchArticles, fetchComments })
export default class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.fetchArticles(this.props.channel.id);
  }

  getChildProps = () => ({
    articles: this.props.articles,
    loading: this.props.loading,
    fetchComments: this.props.fetchComments
  });

  render() {
    return <ArticleList {...this.getChildProps()} />;
  }
}
