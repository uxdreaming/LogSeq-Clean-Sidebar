/**
 * Clean Sidebar - Logseq Plugin
 *
 * Simplifies the Logseq sidebar by allowing users to hide
 * unused navigation elements.
 *
 * @author Aru
 * @license MIT
 */

import '@logseq/libs'

import type { PluginSettings } from './types'
import { SETTINGS_SCHEMA, DEFAULT_SETTINGS } from './core/constants'
import { applyVisibilityClasses, removeAllClasses } from './core/dom'
import { sortFavoritesAlphabetically, observeFavorites } from './core/favorites'
import { hideFavoritesFromRecents, showAllRecents, observeRecents } from './core/recents'
import { getAllStyles } from './styles'

let favoritesObserver: MutationObserver | null = null
let recentsObserver: MutationObserver | null = null

/**
 * Initializes the plugin settings schema
 */
function registerSettings(): void {
  logseq.useSettingsSchema(SETTINGS_SCHEMA)
}

/**
 * Injects plugin styles into Logseq
 */
function injectStyles(): void {
  logseq.provideStyle(getAllStyles())
}

/**
 * Applies current settings to the UI
 * Wrapped in try-catch for resilience
 */
function applySettings(): void {
  try {
    const settings = logseq.settings as Partial<PluginSettings> | null
    applyVisibilityClasses(settings)

    // Apply favorites sorting
    const sortOrder = settings?.favoritesSortOrder ?? DEFAULT_SETTINGS.favoritesSortOrder
    const shouldSort = sortOrder === 'Alfabético'

    // Clean up previous observers
    if (favoritesObserver) {
      favoritesObserver.disconnect()
      favoritesObserver = null
    }
    if (recentsObserver) {
      recentsObserver.disconnect()
      recentsObserver = null
    }

    // Apply sort and set up observer
    if (shouldSort) {
      sortFavoritesAlphabetically()
    }
    favoritesObserver = observeFavorites(shouldSort)

    // Apply favorites hiding from recents
    const shouldHideFavorites = settings?.hideFavoritesFromRecents ?? DEFAULT_SETTINGS.hideFavoritesFromRecents
    if (shouldHideFavorites) {
      hideFavoritesFromRecents()
    } else {
      showAllRecents()
    }
    recentsObserver = observeRecents(shouldHideFavorites)
  } catch (error) {
    console.error('[Clean Sidebar] Failed to apply settings:', error)
  }
}

/**
 * Main plugin initialization
 */
async function main(): Promise<void> {
  console.info('[Clean Sidebar] Plugin loaded')

  registerSettings()
  injectStyles()

  // Apply initial settings after DOM is ready
  setTimeout(applySettings, 500)

  // React to settings changes
  logseq.onSettingsChanged(applySettings)

  // Cleanup on unload
  logseq.beforeunload(async () => {
    removeAllClasses()
    if (favoritesObserver) {
      favoritesObserver.disconnect()
    }
    if (recentsObserver) {
      recentsObserver.disconnect()
    }
  })
}

// Bootstrap
logseq.ready(main).catch(error => {
  console.error('[Clean Sidebar] Failed to initialize:', error)
})
