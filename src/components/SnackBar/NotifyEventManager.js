const NotifyEventManager = {
  notificationAction: undefined,
  notify: function ({ type, label }) {
    if (this.notificationAction) this.notificationAction({ type, label })
  },
  attachNotification: function (callback) {
    this.notificationAction = callback
  }
}

export default NotifyEventManager
