import React, { Component } from 'react';

import ToolBar from './components/ToolBar';
import CheckBox from './components/CheckBox';
import PhotoFeedItem from './components/PhotoFeedItem';

import './App.scss';

import { fetchPhotoFeedData } from './services/api/PhotoFeedAPI';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      isFetching: false,
      photoFeedData: [],
      scrappedItemIds: [],
    }
  }

  componentDidMount() {
    fetchPhotoFeedData(1, this._handleFetchPhotoFeedDataSuccess, this._handleFetchPhotoFeedDataError)
  }

  _handleFetchPhotoFeedDataSuccess = (data) => {
    this.setState({
      photoFeedData: this.state.photoFeedData.concat(data)
    })
  }

  _handleFetchPhotoFeedDataError = (error) => {
    console.warn(error);
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
    console.log(this.state.photoFeedData);
    return (
      <div className="app-container">
        <ToolBar>
          <CheckBox
            label="스크랩한 것만 보기"
            checked={true}
            onClick={() => {}}
          />
        </ToolBar>
        <div className="photofeed__container">
          {this.renderPhotoFeedItems()}
        </div>
      </div>
    )
  }
}

export default App;
