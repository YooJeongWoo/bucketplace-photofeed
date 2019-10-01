import React, { Component } from 'react';
import './photofeeditem.scss';

const DEFAULT_ICON = require('../../assets/icons/bt-scrap-default.svg');
const SCRAPPED_ICON = require('../../assets/icons/bt-scrap-scrapped.svg');

const PROFILE_IMAGE = 'PROFILE_IMAGE';
const MAIN_IMAGE = 'MAIN_IMAGE';

class PhotoFeedItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImageLoaded: false,
      mainImageLoaded: false
    }
  }

  _onImageLoaded = (type) => {
    switch (type) {
      case PROFILE_IMAGE:
        this.setState({ profileImageLoaded: true })
        break;
      case MAIN_IMAGE:
        this.setState({ mainImageLoaded: true })
        break;
      default:
        break;
    }
  }

  render() {
    const {
      profileImageLoaded,
      mainImageLoaded,
    } = this.state
    const {
      itemData,
      isScrapped,
      toggleScrapAction
    } = this.props
    const {
      id,
      image_url,
      nickname,
      profile_image_url
    } = itemData
    return (
      <div className="photofeeditem__container">
        <div className="item__header">
          <img
            className={`profile-image ${profileImageLoaded ? 'loaded' : ''}`}
            src={profile_image_url}
            alt="user-img"
            onLoad={() => this._onImageLoaded(PROFILE_IMAGE)}
          />
          <span className="profile-label">{nickname}</span>
        </div>
        <div className="item__body">
          <div className="item__body-toolbar">
            <button className="scrap-btn" onClick={() => toggleScrapAction(id)}>
              <img
                src={isScrapped ? SCRAPPED_ICON : DEFAULT_ICON}
                className="scrap-btn--icon"
                alt="scrap button"
              />
            </button>
          </div>
          <img
            src={image_url}
            className={`item-image ${mainImageLoaded ? 'loaded' : ''}`}
            alt="item-img"
            onLoad={() => this._onImageLoaded(MAIN_IMAGE)}
          />
        </div>
      </div>
    )
  }
}

export default PhotoFeedItem
