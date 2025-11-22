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
  const favorites = doc.querySelectorAll(FAVORITES_SELECTOR)
  const refs = new Set<string>()

  favorites.forEach(item => {
    // Try multiple attributes and text content
    let ref = item.getAttribute('data-ref')

    if (!ref) {
      // Try to get from link text
      const link = item.querySelector('a')
      if (link) {
        ref = link.textContent?.trim() || ''
      }
    }

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
    let ref = item.getAttribute('data-ref')

    if (!ref) {
      // Try to get from link text
      const link = item.querySelector('a')
      if (link) {
        ref = link.textContent?.trim() || ''
      }
    }

    if (ref && favoriteRefs.has(ref.toLowerCase())) {
      (item as HTMLElement).classList.add('clean-sidebar-hidden')
    } else {
      (item as HTMLElement).classList.remove('clean-sidebar-hidden')
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
