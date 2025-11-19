/**
 * Recents management
 * Handles hiding favorites from recents list
 */

import { getMainDocument } from './dom'

const FAVORITES_SELECTOR = 'ul.favorites li.favorite-item'
const RECENTS_SELECTOR = '.nav-content-item.recent .recent-item'

/**
 * Gets all favorite page references
 */
function getFavoriteRefs(): Set<string> {
  const doc = getMainDocument()
  const favorites = doc.querySelectorAll(FAVORITES_SELECTOR)
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

  const recentItems = doc.querySelectorAll(RECENTS_SELECTOR)

  recentItems.forEach(item => {
    const ref = item.getAttribute('data-ref')
    if (ref && favoriteRefs.has(ref.toLowerCase())) {
      (item as HTMLElement).style.display = 'none'
    } else {
      (item as HTMLElement).style.display = ''
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
    (item as HTMLElement).style.display = ''
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
  const recentsContainer = doc.querySelector('.nav-content-item.recent')

  if (!recentsContainer) {
    return null
  }

  const observer = new MutationObserver(() => {
    setTimeout(() => hideFavoritesFromRecents(), 100)
  })

  observer.observe(recentsContainer, {
    childList: true,
    subtree: true
  })

  return observer
}
