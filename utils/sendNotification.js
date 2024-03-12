import { getBaseUrl } from './getBaseUrl'

export const sendNotification = ({ title, config }) => {
  if (Notification.permission === 'granted') {
    const browser_notification = new Notification(title, config)
    browser_notification.onclick = () => {
      window.open(getBaseUrl(), '_blank')
    }
  }
}