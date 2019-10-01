import React, { Component } from 'react';

import ToolBar from './components/ToolBar';
import CheckBox from './components/CheckBox';
import PhotoFeedItem from './components/PhotoFeedItem';
import InfiniteScrollWrapper from './components/InfiniteScrollWrapper';

import './App.scss';

import { fetchPhotoFeedData } from './services/api/PhotoFeedAPI';
import * as localStorageHelper from './services/localStorage/localStorageHelper';

const SCRAP_LIST_KEY = 'SCRAP_LIST_KEY';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasReachedEnd: false,
      isFetching: false,
      showScrapped: false,
      photoFeedData: [],
      scrappedItemIds: [],
    }
  }

  /*
  ** Life Cycle Hook
  */
  componentDidMount() {
    this._fetchPhotoFeedData(1)
    this._fetchScrappedItems()
  }

  /*
  ** Fething Methods
  */
  _fetchPhotoFeedData = (page) => {
    this.setState({
      page,
      isFetching: true
    })
    fetchPhotoFeedData(page, this._handleFetchPhotoFeedDataSuccess, this._handleFetchPhotoFeedDataError)
  }

  _fetchNextPhotoFeedData = () => {
    if (!this.state.isFetching) {
      this._fetchPhotoFeedData(this.state.page + 1)
    }
  }

  _fetchScrappedItems = () => {
    const data = localStorageHelper.getItem(SCRAP_LIST_KEY)
    if (data) {
      this.setState({
        scrappedItemIds: data
      })
    } else {
      localStorageHelper.setItem(SCRAP_LIST_KEY, [])
    }
  }

  /*
  ** Handler
  */
  _handleFetchPhotoFeedDataSuccess = (data) => {
    if (data.length > 0) {
      this.setState({
        photoFeedData: this.state.photoFeedData.concat(data),
        isFetching: false
      })
    } else {
      this.setState({
        hasReachedEnd: true
      })
    }
  }

  _handleFetchPhotoFeedDataError = (error) => {
    console.warn(error);
  }

  /*
  ** Methods
  */
  _toggleShowScrapped = () => {
    this.setState({
      showScrapped: !this.state.showScrapped
    })
  }

  _toggleScrap = (itemId) => {
    const scrappedItemIds = this.state.scrappedItemIds
    if (scrappedItemIds.includes(itemId)) {
      scrappedItemIds.splice(scrappedItemIds.indexOf(itemId), 1)
      this.setState({ scrappedItemIds })
    } else {
      scrappedItemIds.push(itemId)
      this.setState({ scrappedItemIds })
    }
    localStorageHelper.setItem(SCRAP_LIST_KEY, scrappedItemIds)
  }

  /*
  ** Data Helper
  */
  _isScrapped = (itemId) => {
    return this.state.scrappedItemIds.includes(itemId)
  }


  /*
  ** Renderer
  */
  renderPhotoFeedItems = () => {
    return this.state.photoFeedData.map(item => {
      const { showScrapped, scrappedItemIds } = this.state;
      if (!showScrapped || scrappedItemIds.includes(item.id)) {
        return (
          <PhotoFeedItem
            key={item.id}
            itemData={item}
            isScrapped={this._isScrapped(item.id)}
            toggleScrapAction={this._toggleScrap}
          />
        )
      }
      return null;
    })
  }

  render() {
    const { showScrapped } = this.state;
    return (
      <div className="app-container">
        <ToolBar>
          <CheckBox
            label="스크랩한 것만 보기"
            isChecked={showScrapped}
            onClickAction={this._toggleShowScrapped}
          />
        </ToolBar>
        <div className="photofeed__wrapper">
          <InfiniteScrollWrapper
            className="photofeed__container"
            hasReachedEnd={this.state.hasReachedEnd}
            loadAction={this._fetchNextPhotoFeedData}
          >
            {this.renderPhotoFeedItems()}
          </InfiniteScrollWrapper>
        </div>
      </div>
    )
  }
}

export default App;
