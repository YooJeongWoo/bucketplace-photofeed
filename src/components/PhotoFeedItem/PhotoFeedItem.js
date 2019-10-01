import React, { Component } from 'react';
import './photofeeditem.scss';

const DEFAULT_ICON = require('../../assets/icons/bt-scrap-default.svg');
const SCRAPPED_ICON = require('../../assets/icons/bt-scrap-scrapped.svg');


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
          <div className="item__body-toolbar">
            <button className="scrap-btn">
              <img
                src={isScrapped ? SCRAPPED_ICON : DEFAULT_ICON}
                className="scrap-btn--icon"
                alt="scrap button"
              />
            </button>
          </div>
          <img className="item-image" src={image_url} alt="item-img" />
        </div>
      </div>
    )
  }
}

export default PhotoFeedItem
