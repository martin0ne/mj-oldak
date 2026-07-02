// Cienki, bezpieczny wrapper na gtag. No-op gdy gtag nie istnieje (dev / placeholder / adblock)
// — nigdy nie rzuca, nie zaśmieca konsoli.
export function track(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}
