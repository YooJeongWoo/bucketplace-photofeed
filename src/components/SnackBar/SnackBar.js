import React, { Component } from 'react';
import NotifyEventManager from './NotifyEventManager';
import './snackbar.scss';

class SnackBar extends Component {
  constructor(props) {
    super(props)

    // Attach Notification Action to Manager
    NotifyEventManager.attachNotification(this.pushNotification.bind(this))

    this.state = {
      notificationStack: {}
    }
  }

  pushNotification = ({ type, label }) => {
    const notificationStack = this.state.notificationStack;
    if (Object.keys(notificationStack).length > 0) return // if notification is present, ignore
    const notificationId = setTimeout(() => {
      this.hideNotification(notificationId)
    }, 2000)
    notificationStack[notificationId] = { type, label, show: true }
    this.setState({
      notificationStack
    })
  }

  hideNotification = (notificationId) => {
    const notificationStack = this.state.notificationStack;
    notificationStack[notificationId].show = false;
    this.setState({
      notificationStack
    }, () => {
      setTimeout(() => { // remove notification item
        this.setState({
          notificationStack: {}
        })
      }, 500)
    })
  }

  render() {
    const { notificationStack } = this.state
    return (
      <div id="snackbar-wrapper">
        {
          Object.values(notificationStack).map((notificationItem, index) => (
            <span
              key={`snkb-${index}`}
              className="snackbar-item"
            >
              <p className="snackbar-item--label">
                {notificationItem.label}
              </p>
            </span>
          ))
        }
      </div>
    )
  }
}

export default SnackBar
