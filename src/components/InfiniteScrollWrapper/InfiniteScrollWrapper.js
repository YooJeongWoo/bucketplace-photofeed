import React, { Component } from 'react';

const LOAD_THRESHOLD = 30;

class InfiniteScrollWrapper extends Component {
  componentDidMount() {
    this._addScrollEventListner()
  }

  componentWillUnmount() {
    this._removeScrollEventListner()
  }

  componentDidUpdate() {
    if (this.props.hasReachedEnd) { this._removeScrollEventListner(); }
  }

  _addScrollEventListner = () => {
    window.addEventListener('scroll', this._handleScrollEvent)
  }

  _removeScrollEventListner = () => {
    window.removeEventListener('scroll', this._handleScrollEvent)
  }

  _handleScrollEvent = () => {
    const {
      loadAction
    } = this.props;
    const position = document.documentElement.offsetHeight - window.innerHeight - Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    if (position < LOAD_THRESHOLD) {
      loadAction();
    }
  }

  render() {
    const {
      className,
    } = this.props;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

export default InfiniteScrollWrapper
