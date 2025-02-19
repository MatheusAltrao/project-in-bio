import Mixpanel from 'mixpanel'

const mixpanelEvent = Mixpanel.init('your-mixpanel-token')

export function trackServerEvent(eventName: string, properties: any) {
  if (process.env.NODE_ENV === 'development') return
  mixpanelEvent.track(eventName, properties)
}
