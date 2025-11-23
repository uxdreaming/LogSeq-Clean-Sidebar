(function(){"use strict";const s="clean-sidebar",o={hideJournals:!1,hideWhiteboards:!0,hideFlashcards:!0,hideGraph:!1,hideAllPages:!1,hideCreate:!1,favoritesSortOrder:"manual",hideFavoritesFromRecents:!0,hideCheckboxes:!0},C=[{key:"hideJournals",type:"boolean",default:o.hideJournals,title:"Hide Journals",description:"Hide the Journals section from the sidebar"},{key:"hideWhiteboards",type:"boolean",default:o.hideWhiteboards,title:"Hide Whiteboards",description:"Hide the Whiteboards section from the sidebar"},{key:"hideFlashcards",type:"boolean",default:o.hideFlashcards,title:"Hide Flashcards",description:"Hide the Flashcards section from the sidebar"},{key:"hideGraph",type:"boolean",default:o.hideGraph,title:"Hide Graph View",description:"Hide the Graph View section from the sidebar"},{key:"hideAllPages",type:"boolean",default:o.hideAllPages,title:"Hide All Pages",description:"Hide the All Pages section from the sidebar"},{key:"hideCreate",type:"boolean",default:o.hideCreate,title:"Hide Create Button",description:"Hide the Create button from the sidebar"},{key:"_favoritesHeading",type:"heading",title:"Favorites",description:""},{key:"favoritesSortOrder",type:"enum",default:o.favoritesSortOrder,title:"Sort Order",description:"",enumChoices:["Alphabetical","Manual"],enumPicker:"radio"},{key:"_recentsHeading",type:"heading",title:"Recent Pages",description:""},{key:"hideFavoritesFromRecents",type:"boolean",default:o.hideFavoritesFromRecents,title:"Hide duplicates",description:"Hide favorite pages from the Recent pages list to avoid duplicates"},{key:"_uiHeading",type:"heading",title:"Interface",description:""},{key:"hideCheckboxes",type:"boolean",default:o.hideCheckboxes,title:"Hide checkboxes and menus",description:"Hide checkboxes and menu buttons (three dots) in Favorites and Recent pages"}],e={plugin:s,hideJournals:`${s}-hide-journals`,hideWhiteboards:`${s}-hide-whiteboards`,hideFlashcards:`${s}-hide-flashcards`,hideGraph:`${s}-hide-graph`,hideAllPages:`${s}-hide-all-pages`,hideCreate:`${s}-hide-create`,hideCheckboxes:`${s}-hide-checkboxes`,active:`${s}-active`};function d(){return parent.document}function p(){return d().body}function S(t){const r=p();if(!r){console.warn("[Clean Sidebar] Body element not found");return}const i={...o,...t},n=[[e.hideJournals,i.hideJournals],[e.hideWhiteboards,i.hideWhiteboards],[e.hideFlashcards,i.hideFlashcards],[e.hideGraph,i.hideGraph],[e.hideAllPages,i.hideAllPages],[e.hideCreate,i.hideCreate],[e.hideCheckboxes,i.hideCheckboxes]];n.forEach(([l,m])=>{r.classList.toggle(l,m)});const a=n.some(([,l])=>l);r.classList.toggle(e.active,a)}function k(){const t=p();t&&Object.values(e).forEach(r=>{t.classList.remove(r)})}const b="ul.favorites",x="li.favorite-item";function F(){const r=d().querySelector(b);return r?Array.from(r.querySelectorAll(x)):[]}function y(t){return t.querySelector(".page-title")?.textContent?.trim().toLowerCase()??""}function g(){const r=d().querySelector(b);if(!r)return;const i=F();if(i.length===0)return;[...i].sort((a,l)=>{const m=y(a),I=y(l);return m.localeCompare(I)}).forEach(a=>{r.appendChild(a)})}function A(t){if(!t)return null;const i=d().querySelector(b);if(!i)return null;const n=new MutationObserver(()=>{setTimeout(()=>g(),100)});return n.observe(i,{childList:!0,subtree:!1}),n}const $=".recent-item, .nav-content-item.recent .nav-content-item";function H(){const r=d().querySelectorAll("ul.favorites li.favorite-item"),i=new Set;return r.forEach(n=>{const a=n.getAttribute("data-ref");a&&i.add(a.toLowerCase())}),i}function f(){const t=d(),r=H();if(r.size===0)return;t.querySelectorAll("li.recent-item").forEach(n=>{const a=n.getAttribute("data-ref");if(a){const l=a.toLowerCase();r.has(l)?n.classList.add("clean-sidebar-hidden"):n.classList.remove("clean-sidebar-hidden")}})}function E(){d().querySelectorAll($).forEach(i=>{i.classList.remove("clean-sidebar-hidden")})}function v(t){if(!t)return null;const i=d().querySelector(".left-sidebar-inner");if(!i)return setTimeout(()=>v(t),500),null;f();const n=new MutationObserver(()=>{f()});return n.observe(i,{childList:!0,subtree:!0}),n}function R(){return`
    /* =========================================
       Clean Sidebar - Element Visibility
       ========================================= */

    /* Journals/Diarios
       Selector targets: a.item containing .ls-icon-calendar */
    html body.${e.hideJournals} .left-sidebar-inner a.item:has(.ls-icon-calendar) {
      display: none;
    }

    /* Whiteboards/Pizarras
       Selector targets: div.whiteboard container */
    html body.${e.hideWhiteboards} .left-sidebar-inner div.whiteboard {
      display: none;
    }

    /* Flashcards/Tarjetas de memorización
       Selector targets: div.flashcards-nav container */
    html body.${e.hideFlashcards} .left-sidebar-inner div.flashcards-nav {
      display: none;
    }

    /* Graph/Vista de Grafo
       Selector targets: a.item containing .ls-icon-hierarchy */
    html body.${e.hideGraph} .left-sidebar-inner a.item:has(.ls-icon-hierarchy) {
      display: none;
    }

    /* All Pages/Lista de páginas
       Selector targets: div.all-pages-nav container */
    html body.${e.hideAllPages} .left-sidebar-inner div.all-pages-nav {
      display: none;
    }

    /* Create/Crear
       Selector targets: button#create-button */
    html body.${e.hideCreate} .left-sidebar-inner #create-button {
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

    /* High specificity to override LogSeq styles */
    html body .left-sidebar-inner li.recent-item.clean-sidebar-hidden,
    html body .left-sidebar-inner li.recent-item.clean-sidebar-hidden.select-none,
    html body .left-sidebar-inner .nav-content-item.recent li.recent-item.clean-sidebar-hidden,
    li.recent-item.clean-sidebar-hidden {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* =========================================
       Hide Checkboxes and Menu Buttons in Sidebar
       ========================================= */

    /* Hide all checkboxes in Favorites and Recents sections */
    html body.${e.hideCheckboxes} .left-sidebar-inner .nav-content-item input[type="checkbox"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .favorite-item input[type="checkbox"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .recent-item input[type="checkbox"],
    html body.${e.hideCheckboxes} .left-sidebar-inner li input[type="checkbox"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .nav-content-item .form-checkbox,
    html body.${e.hideCheckboxes} .left-sidebar-inner .favorite-item .form-checkbox,
    html body.${e.hideCheckboxes} .left-sidebar-inner .recent-item .form-checkbox {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      width: 0 !important;
      height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* Hide three-dots menu buttons */
    html body.${e.hideCheckboxes} .left-sidebar-inner .nav-content-item button[aria-haspopup="menu"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .favorite-item button[aria-haspopup="menu"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .recent-item button[aria-haspopup="menu"],
    html body.${e.hideCheckboxes} .left-sidebar-inner .nav-content-item .ls-icon-dots,
    html body.${e.hideCheckboxes} .left-sidebar-inner .favorite-item .ls-icon-dots,
    html body.${e.hideCheckboxes} .left-sidebar-inner .recent-item .ls-icon-dots {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* Adjust spacing when checkboxes are hidden */
    html body.${e.hideCheckboxes} .left-sidebar-inner .nav-content-item,
    html body.${e.hideCheckboxes} .left-sidebar-inner .favorite-item,
    html body.${e.hideCheckboxes} .left-sidebar-inner .recent-item {
      padding-left: 8px !important;
    }
  `}function L(){return R()}/**
 * Clean Sidebar - Logseq Plugin
 *
 * Simplifies the Logseq sidebar by allowing users to hide
 * unused navigation elements.
 *
 * @author Aru
 * @license MIT
 */let c=null,h=null;function q(){logseq.useSettingsSchema(C)}function O(){logseq.provideStyle(L())}function u(){try{const t=logseq.settings;S(t);const i=(t?.favoritesSortOrder??o.favoritesSortOrder)==="Alphabetical";c&&(c.disconnect(),c=null),h&&(h.disconnect(),h=null),i&&g(),c=A(i);const n=t?.hideFavoritesFromRecents??o.hideFavoritesFromRecents;n?f():E(),h=v(n)}catch(t){console.error("[Clean Sidebar] Failed to apply settings:",t)}}async function w(){console.info("[Clean Sidebar] Plugin loaded"),q(),O(),logseq.App.onRouteChanged(()=>{u()}),u(),logseq.onSettingsChanged(u),logseq.beforeunload(async()=>{k(),c&&c.disconnect(),h&&h.disconnect()})}logseq.ready(w).catch(t=>{console.error("[Clean Sidebar] Failed to initialize:",t)})})();
