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
    console.log(data);
  }

  _handleFetchPhotoFeedDataError = (error) => {
    console.warn(error);
  }

  render() {
    return (
      <div>
        <h1>Photo Feed</h1>
        <ToolBar>
          <CheckBox
            label="스크랩한 것만 보기"
            checked={true}
            onClick={() => {}}
          />
        </ToolBar>
        <PhotoFeedItem />
      </div>
    )
  }
}

export default App;
