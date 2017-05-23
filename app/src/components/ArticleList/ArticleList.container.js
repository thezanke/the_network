import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleList from 'components/ArticleList/ArticleList';
import { fetchArticles } from 'modules/articles';

const mapStateToProps = state => ({});

@connect(mapStateToProps, { fetchArticles })
export default class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.fetchArticles();
  }
  render() {
    return <ArticleList />;
  }
}
