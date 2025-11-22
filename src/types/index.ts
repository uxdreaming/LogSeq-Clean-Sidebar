/**
 * Type definitions for Clean Sidebar plugin
 */

export interface SidebarElement {
  readonly id: SidebarElementId
  readonly name: string
  readonly cssClass: string
  readonly icon: string
  readonly action: () => void
}

export type SidebarElementId =
  | 'journals'
  | 'whiteboards'
  | 'flashcards'
  | 'graph'
  | 'allPages'

export type FavoritesSortOrder = 'manual' | 'alphabetical'

export interface PluginSettings {
  hideJournals: boolean
  hideWhiteboards: boolean
  hideFlashcards: boolean
  hideGraph: boolean
  hideAllPages: boolean
  hideCreate: boolean
  favoritesSortOrder: FavoritesSortOrder
  hideFavoritesFromRecents: boolean
  hideCheckboxes: boolean
}

export interface SettingSchemaItem {
  key: keyof PluginSettings | '_favoritesHeading' | '_recentsHeading' | '_uiHeading'
  type: 'boolean' | 'heading' | 'enum'
  default?: boolean | string
  title: string
  description: string
  enumChoices?: string[]
  enumPicker?: 'select' | 'radio'
}
