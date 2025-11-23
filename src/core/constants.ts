/**
 * Plugin constants and configuration
 */

import type { PluginSettings, SettingSchemaItem } from '../types'

export const PLUGIN_NAME = 'clean-sidebar'

export const DEFAULT_SETTINGS: PluginSettings = {
  hideJournals: false,
  hideWhiteboards: true,
  hideFlashcards: true,
  hideGraph: false,
  hideAllPages: false,
  hideCreate: false,
  favoritesSortOrder: 'manual',
  hideFavoritesFromRecents: true,
  hideCheckboxes: true
}

export const SETTINGS_SCHEMA: SettingSchemaItem[] = [
  {
    key: 'hideJournals',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideJournals,
    title: 'Hide Journals',
    description: 'Hide the Journals section from the sidebar'
  },
  {
    key: 'hideWhiteboards',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideWhiteboards,
    title: 'Hide Whiteboards',
    description: 'Hide the Whiteboards section from the sidebar'
  },
  {
    key: 'hideFlashcards',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideFlashcards,
    title: 'Hide Flashcards',
    description: 'Hide the Flashcards section from the sidebar'
  },
  {
    key: 'hideGraph',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideGraph,
    title: 'Hide Graph View',
    description: 'Hide the Graph View section from the sidebar'
  },
  {
    key: 'hideAllPages',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideAllPages,
    title: 'Hide All Pages',
    description: 'Hide the All Pages section from the sidebar'
  },
  {
    key: 'hideCreate',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideCreate,
    title: 'Hide Create Button',
    description: 'Hide the Create button from the sidebar'
  },
  {
    key: '_favoritesHeading',
    type: 'heading',
    title: 'Favorites',
    description: ''
  },
  {
    key: 'favoritesSortOrder',
    type: 'enum',
    default: DEFAULT_SETTINGS.favoritesSortOrder,
    title: 'Sort Order',
    description: '',
    enumChoices: ['Alphabetical', 'Manual'],
    enumPicker: 'radio'
  },
  {
    key: '_recentsHeading',
    type: 'heading',
    title: 'Recent Pages',
    description: ''
  },
  {
    key: 'hideFavoritesFromRecents',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideFavoritesFromRecents,
    title: 'Hide duplicates',
    description: 'Hide favorite pages from the Recent pages list to avoid duplicates'
  },
  {
    key: '_uiHeading',
    type: 'heading',
    title: 'Interface',
    description: ''
  },
  {
    key: 'hideCheckboxes',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideCheckboxes,
    title: 'Hide checkboxes and menus',
    description: 'Hide checkboxes and menu buttons (three dots) in Favorites and Recent pages'
  }
]

/**
 * CSS class mappings for sidebar elements
 * These target specific Logseq DOM structures
 */
export const CSS_CLASSES = {
  plugin: PLUGIN_NAME,
  hideJournals: `${PLUGIN_NAME}-hide-journals`,
  hideWhiteboards: `${PLUGIN_NAME}-hide-whiteboards`,
  hideFlashcards: `${PLUGIN_NAME}-hide-flashcards`,
  hideGraph: `${PLUGIN_NAME}-hide-graph`,
  hideAllPages: `${PLUGIN_NAME}-hide-all-pages`,
  hideCreate: `${PLUGIN_NAME}-hide-create`,
  hideCheckboxes: `${PLUGIN_NAME}-hide-checkboxes`,
  active: `${PLUGIN_NAME}-active`
} as const
