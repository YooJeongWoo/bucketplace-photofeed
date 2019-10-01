import React, { Component } from 'react';

import ToolBar from './components/ToolBar';
import CheckBox from './components/CheckBox';
import PhotoFeedItem from './components/PhotoFeedItem';
import InfiniteScrollWrapper from './components/InfiniteScrollWrapper';

import './App.scss';

import { fetchPhotoFeedData } from './services/api/PhotoFeedAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      hasReachedEnd: false,
      isFetching: false,
      photoFeedData: [],
      scrappedItemIds: [],
    }
  }

  componentDidMount() {
    this._fetchPhotoFeedData(1)
  }

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

  _handleFetchPhotoFeedDataSuccess = (data) => {
    this.setState({
      photoFeedData: this.state.photoFeedData.concat(data),
      isFetching: false
    })
  }

  _handleFetchPhotoFeedDataError = (error) => {
    // The only way to check the end is looking at error response with a 403 code
    this.setState({
      hasReachedEnd: true
    })
  }

  renderPhotoFeedItems = () => {
    return this.state.photoFeedData.map(item => (
      <PhotoFeedItem
        key={item.id}
        itemData={item}
        scrapped={false}
        toggleScrapAction={() => {}}
      />
    ))
  }

  render() {
    return (
      <div className="app-container">
        <ToolBar>
          <CheckBox
            label="스크랩한 것만 보기"
            checked={true}
            onClick={() => {}}
          />
        </ToolBar>
        <InfiniteScrollWrapper
          className="photofeed__container"
          hasReachedEnd={this.state.hasReachedEnd}
          loadAction={this._fetchNextPhotoFeedData}
        >
          {this.renderPhotoFeedItems()}
        </InfiniteScrollWrapper>
      </div>
    )
  }
}

export default App;
