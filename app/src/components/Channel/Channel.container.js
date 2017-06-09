import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchChannel, channelData, channelLoading } from 'modules/channel';

import App from './Channel';

const mapStateToProps = state => ({
  channel: channelData(state),
  loading: channelLoading(state)
});

@connect(mapStateToProps, { fetchChannel })
export default class ChannelContainer extends Component {
  componentDidMount() {
    this.props.fetchChannel(1);
  }

  getChildProps = () => ({
    channel: this.props.channel,
    loading: this.props.channelLoading
  });

  render() {
    return <App {...this.getChildProps()} />;
  }
}
