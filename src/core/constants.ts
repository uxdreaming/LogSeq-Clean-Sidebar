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
  hideFavoritesFromRecents: true
}

export const SETTINGS_SCHEMA: SettingSchemaItem[] = [
  {
    key: 'hideJournals',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideJournals,
    title: 'Ocultar Diarios',
    description: 'Oculta la sección de Diarios de la barra lateral'
  },
  {
    key: 'hideWhiteboards',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideWhiteboards,
    title: 'Ocultar Pizarras',
    description: 'Oculta la sección de Pizarras de la barra lateral'
  },
  {
    key: 'hideFlashcards',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideFlashcards,
    title: 'Ocultar Tarjetas de memorización',
    description: 'Oculta la sección de Tarjetas de memorización de la barra lateral'
  },
  {
    key: 'hideGraph',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideGraph,
    title: 'Ocultar Vista de Grafo',
    description: 'Oculta la sección de Vista de Grafo de la barra lateral'
  },
  {
    key: 'hideAllPages',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideAllPages,
    title: 'Ocultar Lista de páginas',
    description: 'Oculta la sección de Lista de páginas de la barra lateral'
  },
  {
    key: 'hideCreate',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideCreate,
    title: 'Ocultar Crear',
    description: 'Oculta el botón Crear de la barra lateral'
  },
  {
    key: '_favoritesHeading',
    type: 'heading',
    title: 'Favoritos',
    description: ''
  },
  {
    key: 'favoritesSortOrder',
    type: 'enum',
    default: DEFAULT_SETTINGS.favoritesSortOrder,
    title: 'Orden',
    description: '',
    enumChoices: ['Alfabético', 'Manual'],
    enumPicker: 'radio'
  },
  {
    key: '_recentsHeading',
    type: 'heading',
    title: 'Recientes',
    description: ''
  },
  {
    key: 'hideFavoritesFromRecents',
    type: 'boolean',
    default: DEFAULT_SETTINGS.hideFavoritesFromRecents,
    title: 'Ocultar duplicados',
    description: 'No mostrar en Recientes las páginas que se encuentran en Favoritos'
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
  active: `${PLUGIN_NAME}-active`
} as const
