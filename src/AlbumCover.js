import React, { Component } from 'react';

export default class AlbumCover extends Component {
  render() {
    const src = this.props.track.album.images[0].url;
    return (<img src={src} style={{ width: 400, height: 400 }} />);
  }
}