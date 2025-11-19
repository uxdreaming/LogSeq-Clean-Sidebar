/**
 * Favorites sorting functionality
 * Handles reordering of favorite items in the sidebar
 */

import { getMainDocument } from './dom'

const FAVORITES_SELECTOR = 'ul.favorites'
const FAVORITE_ITEM_SELECTOR = 'li.favorite-item'

/**
 * Gets all favorite items from the DOM
 */
function getFavoriteItems(): HTMLLIElement[] {
  const doc = getMainDocument()
  const container = doc.querySelector(FAVORITES_SELECTOR)

  if (!container) {
    return []
  }

  return Array.from(container.querySelectorAll(FAVORITE_ITEM_SELECTOR)) as HTMLLIElement[]
}

/**
 * Gets the title text from a favorite item
 */
function getItemTitle(item: HTMLLIElement): string {
  const titleElement = item.querySelector('.page-title')
  return titleElement?.textContent?.trim().toLowerCase() ?? ''
}

/**
 * Sorts favorite items alphabetically
 */
export function sortFavoritesAlphabetically(): void {
  const doc = getMainDocument()
  const container = doc.querySelector(FAVORITES_SELECTOR)

  if (!container) {
    return
  }

  const items = getFavoriteItems()

  if (items.length === 0) {
    return
  }

  const sortedItems = [...items].sort((a, b) => {
    const titleA = getItemTitle(a)
    const titleB = getItemTitle(b)
    return titleA.localeCompare(titleB)
  })

  // Reorder DOM elements
  sortedItems.forEach(item => {
    container.appendChild(item)
  })
}

/**
 * Observes changes to the favorites list and reapplies sorting
 */
export function observeFavorites(shouldSort: boolean): MutationObserver | null {
  if (!shouldSort) {
    return null
  }

  const doc = getMainDocument()
  const container = doc.querySelector(FAVORITES_SELECTOR)

  if (!container) {
    return null
  }

  const observer = new MutationObserver(() => {
    // Debounce to avoid multiple rapid reorders
    setTimeout(() => sortFavoritesAlphabetically(), 100)
  })

  observer.observe(container, {
    childList: true,
    subtree: false
  })

  return observer
}
