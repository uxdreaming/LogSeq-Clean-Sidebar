/**
 * Style aggregator
 * Combines all plugin styles for injection
 */

import { getSidebarStyles } from './sidebar'

/**
 * Returns all plugin CSS combined
 */
export function getAllStyles(): string {
  return getSidebarStyles()
}
