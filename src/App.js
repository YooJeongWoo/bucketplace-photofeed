import React, { Component } from 'react';

import ToolBar from './components/ToolBar';
import CheckBox from './components/CheckBox';
import PhotoFeedItem from './components/PhotoFeedItem';
import InfiniteScrollWrapper from './components/InfiniteScrollWrapper';

import { SnackBar, NotifyEventManager } from './components/SnackBar';

import './App.scss';

import { fetchPhotoFeedData } from './services/api/PhotoFeedAPI';
import * as localStorageHelper from './services/localStorage/localStorageHelper';

const SCRAP_LIST_KEY = 'SCRAP_LIST_KEY';

class App extends Component {
  constructor(props) {
    super(props)
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
    // @OPTIONAL_TODO
    // Change Type to 'warn'
    // Use error response message
    NotifyEventManager.notify({ type: 'default', label: '피드를 로드하는 중 오류가 발생했습니다.' })
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
    if (scrappedItemIds.includes(itemId)) { // Unscrap Item
      scrappedItemIds.splice(scrappedItemIds.indexOf(itemId), 1)
      this.setState({ scrappedItemIds })
      NotifyEventManager.notify({ type: 'default', label: '스크랩 제거되었습니다.' })
    } else { // Scrap Item
      scrappedItemIds.push(itemId)
      this.setState({ scrappedItemIds })
      NotifyEventManager.notify({ type: 'default', label: '스크랩 하였습니다.' })
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
    const { showScrapped, scrappedItemIds } = this.state;
    if (!showScrapped || scrappedItemIds.length > 0) {
      return this.state.photoFeedData.map(item => {
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
    } else {
      return (
        <div className="scrap-empty">
          <p>스크랩한 아이템이 없습니다.</p>
        </div>
      )
    }
  }

  render() {
    const { showScrapped } = this.state;
    return (
      <div className="app-container">
        <main>
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
        </main>
        <SnackBar />
      </div>
    )
  }
}

export default App;
