import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChannel, channelData, channelLoading } from 'modules/channel';

import App from './App';

const mapStateToProps = state => ({
  channel: channelData(state),
  channelLoading: channelLoading(state)
});

@connect(mapStateToProps, { fetchChannel })
export default class AppContainer extends Component {
  componentDidMount() {
    this.props.fetchChannel(1);
  }

  getChildProps = props => ({
    channel: props.channel,
    loading: props.channelLoading
  });

  render() {
    const { channel } = this.props;
    return <App {...this.getChildProps(this.props)} />;
  }
}
