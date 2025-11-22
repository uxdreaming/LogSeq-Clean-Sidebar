/**
 * Sidebar visibility styles
 * Uses CSS specificity instead of !important
 */

import { CSS_CLASSES } from '../core/constants'

/**
 * Generates CSS for hiding sidebar elements
 * High specificity selectors avoid the need for !important
 */
export function getSidebarStyles(): string {
  return `
    /* =========================================
       Clean Sidebar - Element Visibility
       ========================================= */

    /* Journals/Diarios
       Selector targets: a.item containing .ls-icon-calendar */
    html body.${CSS_CLASSES.hideJournals} .left-sidebar-inner a.item:has(.ls-icon-calendar) {
      display: none;
    }

    /* Whiteboards/Pizarras
       Selector targets: div.whiteboard container */
    html body.${CSS_CLASSES.hideWhiteboards} .left-sidebar-inner div.whiteboard {
      display: none;
    }

    /* Flashcards/Tarjetas de memorización
       Selector targets: div.flashcards-nav container */
    html body.${CSS_CLASSES.hideFlashcards} .left-sidebar-inner div.flashcards-nav {
      display: none;
    }

    /* Graph/Vista de Grafo
       Selector targets: a.item containing .ls-icon-hierarchy */
    html body.${CSS_CLASSES.hideGraph} .left-sidebar-inner a.item:has(.ls-icon-hierarchy) {
      display: none;
    }

    /* All Pages/Lista de páginas
       Selector targets: div.all-pages-nav container */
    html body.${CSS_CLASSES.hideAllPages} .left-sidebar-inner div.all-pages-nav {
      display: none;
    }

    /* Create/Crear
       Selector targets: button#create-button */
    html body.${CSS_CLASSES.hideCreate} .left-sidebar-inner #create-button {
      display: none;
    }

    /* =========================================
       Favorites Drag and Drop Indicator
       ========================================= */

    /* Hide default Logseq drag indicator (green border) */
    html body .left-sidebar-inner ul.favorites li.favorite-item.dragging-target {
      border-left: none;
      border-color: transparent;
    }

    /* Favorite item base for drag */
    html body .left-sidebar-inner ul.favorites li.favorite-item {
      position: relative;
    }

    /* Horizontal line indicator - appears above the target element */
    html body .left-sidebar-inner ul.favorites li.favorite-item.dragging-target::before {
      content: '';
      position: absolute;
      left: 8px;
      right: 8px;
      top: -1px;
      height: 2px;
      background-color: #d1d5db;
      border-radius: 1px;
      z-index: 10;
    }

    /* Style for the item being dragged */
    html body .left-sidebar-inner ul.favorites li.favorite-item.dragging {
      opacity: 0.5;
    }

    /* =========================================
       Hide Duplicate Favorites from Recents
       ========================================= */

    /* High specificity to override LogSeq styles without !important */
    html body #app-container .left-sidebar-inner .nav-content-item.recent li.recent-item.clean-sidebar-hidden,
    html body #app-container .left-sidebar-inner li.recent-item.clean-sidebar-hidden {
      display: none;
    }

    /* =========================================
       Hide Checkboxes and Menu Buttons in Sidebar
       ========================================= */

    /* Hide all checkboxes in Favorites and Recents sections */
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .nav-content-item input[type="checkbox"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .favorite-item input[type="checkbox"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .recent-item input[type="checkbox"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner li input[type="checkbox"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .nav-content-item .form-checkbox,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .favorite-item .form-checkbox,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .recent-item .form-checkbox {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Hide three-dots menu buttons */
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .nav-content-item button[aria-haspopup="menu"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .favorite-item button[aria-haspopup="menu"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .recent-item button[aria-haspopup="menu"],
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .nav-content-item .ls-icon-dots,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .favorite-item .ls-icon-dots,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .recent-item .ls-icon-dots {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* Adjust spacing when checkboxes are hidden */
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .nav-content-item,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .favorite-item,
    html body.${CSS_CLASSES.hideCheckboxes} .left-sidebar-inner .recent-item {
      padding-left: 8px !important;
    }
  `
}
