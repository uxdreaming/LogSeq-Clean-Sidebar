/**
 * Recents management
 * Handles hiding favorites from recents list
 */

import { getMainDocument } from './dom'

const FAVORITES_SELECTOR = '.favorite-item, ul.favorites li, .nav-content-item.favorite .nav-content-item'
const RECENTS_SELECTOR = '.recent-item, .nav-content-item.recent .nav-content-item'

/**
 * Gets all favorite page references
 */
function getFavoriteRefs(): Set<string> {
  const doc = getMainDocument()

  // Use more specific selector for favorite items
  const favorites = doc.querySelectorAll('ul.favorites li.favorite-item')
  const refs = new Set<string>()

  favorites.forEach(item => {
    const ref = item.getAttribute('data-ref')

    if (ref) {
      refs.add(ref.toLowerCase())
    }
  })

  return refs
}

/**
 * Hides recent items that are also in favorites
 */
export function hideFavoritesFromRecents(): void {
  const doc = getMainDocument()
  const favoriteRefs = getFavoriteRefs()

  if (favoriteRefs.size === 0) {
    return
  }

  // Use more specific selector for recent items
  const recentItems = doc.querySelectorAll('li.recent-item')

  recentItems.forEach(item => {
    const ref = item.getAttribute('data-ref')

    if (ref) {
      const refLower = ref.toLowerCase()

      if (favoriteRefs.has(refLower)) {
        // Use CSS class instead of inline style for better persistence
        ;(item as HTMLElement).classList.add('clean-sidebar-hidden')
      } else {
        (item as HTMLElement).classList.remove('clean-sidebar-hidden')
      }
    }
  })
}

/**
 * Shows all recent items (removes hiding)
 */
export function showAllRecents(): void {
  const doc = getMainDocument()
  const recentItems = doc.querySelectorAll(RECENTS_SELECTOR)

  recentItems.forEach(item => {
    (item as HTMLElement).classList.remove('clean-sidebar-hidden')
  })
}

/**
 * Observes changes to recents and reapplies hiding
 */
export function observeRecents(shouldHide: boolean): MutationObserver | null {
  if (!shouldHide) {
    return null
  }

  const doc = getMainDocument()
  const sidebar = doc.querySelector('.left-sidebar-inner')

  if (!sidebar) {
    // Retry after delay if sidebar not ready
    setTimeout(() => observeRecents(shouldHide), 500)
    return null
  }

  // Apply immediately
  hideFavoritesFromRecents()

  const observer = new MutationObserver(() => {
    hideFavoritesFromRecents()
  })

  observer.observe(sidebar, {
    childList: true,
    subtree: true
  })

  return observer
}
