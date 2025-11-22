/**
 * DOM manipulation utilities
 * Handles interaction with Logseq's parent document
 */

import type { PluginSettings } from '../types'
import { CSS_CLASSES, DEFAULT_SETTINGS } from './constants'

/**
 * Gets the main document body from Logseq's parent window
 * Logseq plugins run in an iframe, so we need parent.document
 */
export function getMainDocument(): Document {
  return parent.document
}

/**
 * Gets the body element from the main document
 */
export function getBody(): HTMLElement | null {
  return getMainDocument().body
}

/**
 * Applies visibility classes to the body based on settings
 */
export function applyVisibilityClasses(settings: Partial<PluginSettings> | null): void {
  const body = getBody()

  if (!body) {
    console.warn('[Clean Sidebar] Body element not found')
    return
  }

  const effectiveSettings = {
    ...DEFAULT_SETTINGS,
    ...settings
  }

  const classMapping: [string, boolean][] = [
    [CSS_CLASSES.hideJournals, effectiveSettings.hideJournals],
    [CSS_CLASSES.hideWhiteboards, effectiveSettings.hideWhiteboards],
    [CSS_CLASSES.hideFlashcards, effectiveSettings.hideFlashcards],
    [CSS_CLASSES.hideGraph, effectiveSettings.hideGraph],
    [CSS_CLASSES.hideAllPages, effectiveSettings.hideAllPages],
    [CSS_CLASSES.hideCreate, effectiveSettings.hideCreate],
    [CSS_CLASSES.hideCheckboxes, effectiveSettings.hideCheckboxes]
  ]

  classMapping.forEach(([className, shouldAdd]) => {
    body.classList.toggle(className, shouldAdd)
  })

  const hasHiddenElements = classMapping.some(([, isHidden]) => isHidden)
  body.classList.toggle(CSS_CLASSES.active, hasHiddenElements)
}

/**
 * Removes all plugin-related classes from the body
 * Used for cleanup when plugin is disabled
 */
export function removeAllClasses(): void {
  const body = getBody()

  if (!body) {
    return
  }

  Object.values(CSS_CLASSES).forEach(className => {
    body.classList.remove(className)
  })
}
