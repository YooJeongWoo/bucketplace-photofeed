const NotifyEventManager = {
  notificationAction: undefined, // notification action
  attachNotification: function (callback) {
    this.notificationAction = callback
  },
  notify: function ({ type, label }) {
    if (this.notificationAction) this.notificationAction({ type, label })
  }
}

export default NotifyEventManager
