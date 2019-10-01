import React, { Component } from 'react';
import './photofeeditem.scss';

class PhotoFeedItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
  }

  render() {
    const {
      itemData,
      isScrapped,
      toggleScrapAction
    } = this.props
    const {
      image_url,
      nickname,
      profile_image_url
    } = itemData
    return (
      <div className="photofeeditem__container">
        <div className="item__header">
          <img className="profile-img" src={profile_image_url} alt="user-img" />
          <span className="profile-label">{nickname}</span>
        </div>
        <div className="item__body">
          <img className="item-image" src={image_url} alt="item-img" />
        </div>
      </div>
    )
  }
}

export default PhotoFeedItem
