(function(){"use strict";const s="clean-sidebar",n={hideJournals:!1,hideWhiteboards:!0,hideFlashcards:!0,hideGraph:!1,hideAllPages:!1,hideCreate:!1,favoritesSortOrder:"manual",hideFavoritesFromRecents:!0,hideCheckboxes:!0},C=[{key:"hideJournals",type:"boolean",default:n.hideJournals,title:"Ocultar Diarios",description:"Oculta la sección de Diarios de la barra lateral"},{key:"hideWhiteboards",type:"boolean",default:n.hideWhiteboards,title:"Ocultar Pizarras",description:"Oculta la sección de Pizarras de la barra lateral"},{key:"hideFlashcards",type:"boolean",default:n.hideFlashcards,title:"Ocultar Tarjetas de memorización",description:"Oculta la sección de Tarjetas de memorización de la barra lateral"},{key:"hideGraph",type:"boolean",default:n.hideGraph,title:"Ocultar Vista de Grafo",description:"Oculta la sección de Vista de Grafo de la barra lateral"},{key:"hideAllPages",type:"boolean",default:n.hideAllPages,title:"Ocultar Lista de páginas",description:"Oculta la sección de Lista de páginas de la barra lateral"},{key:"hideCreate",type:"boolean",default:n.hideCreate,title:"Ocultar Crear",description:"Oculta el botón Crear de la barra lateral"},{key:"_favoritesHeading",type:"heading",title:"Favoritos",description:""},{key:"favoritesSortOrder",type:"enum",default:n.favoritesSortOrder,title:"Orden",description:"",enumChoices:["Alfabético","Manual"],enumPicker:"radio"},{key:"_recentsHeading",type:"heading",title:"Recientes",description:""},{key:"hideFavoritesFromRecents",type:"boolean",default:n.hideFavoritesFromRecents,title:"Ocultar duplicados",description:"No mostrar en Recientes las páginas que se encuentran en Favoritos"},{key:"_uiHeading",type:"heading",title:"Interfaz",description:""},{key:"hideCheckboxes",type:"boolean",default:n.hideCheckboxes,title:"Ocultar checkboxes y menús",description:"Oculta los checkboxes y los botones de menú (tres puntos) en Favoritos y Recientes"}],e={plugin:s,hideJournals:`${s}-hide-journals`,hideWhiteboards:`${s}-hide-whiteboards`,hideFlashcards:`${s}-hide-flashcards`,hideGraph:`${s}-hide-graph`,hideAllPages:`${s}-hide-all-pages`,hideCreate:`${s}-hide-create`,hideCheckboxes:`${s}-hide-checkboxes`,active:`${s}-active`};function l(){return parent.document}function f(){return l().body}function S(i){const r=f();if(!r){console.warn("[Clean Sidebar] Body element not found");return}const t={...n,...i},o=[[e.hideJournals,t.hideJournals],[e.hideWhiteboards,t.hideWhiteboards],[e.hideFlashcards,t.hideFlashcards],[e.hideGraph,t.hideGraph],[e.hideAllPages,t.hideAllPages],[e.hideCreate,t.hideCreate],[e.hideCheckboxes,t.hideCheckboxes]];o.forEach(([h,u])=>{r.classList.toggle(h,u)});const a=o.some(([,h])=>h);r.classList.toggle(e.active,a)}function k(){const i=f();i&&Object.values(e).forEach(r=>{i.classList.remove(r)})}const b="ul.favorites",x="li.favorite-item";function F(){const r=l().querySelector(b);return r?Array.from(r.querySelectorAll(x)):[]}function m(i){return i.querySelector(".page-title")?.textContent?.trim().toLowerCase()??""}function p(){const r=l().querySelector(b);if(!r)return;const t=F();if(t.length===0)return;[...t].sort((a,h)=>{const u=m(a),P=m(h);return u.localeCompare(P)}).forEach(a=>{r.appendChild(a)})}function O(i){if(!i)return null;const t=l().querySelector(b);if(!t)return null;const o=new MutationObserver(()=>{setTimeout(()=>p(),100)});return o.observe(t,{childList:!0,subtree:!1}),o}const $="ul.favorites li.favorite-item",y=".nav-content-item.recent .recent-item";function A(){const r=l().querySelectorAll($),t=new Set;return r.forEach(o=>{const a=o.getAttribute("data-ref");a&&t.add(a.toLowerCase())}),t}function g(){const i=l(),r=A();if(r.size===0)return;i.querySelectorAll(y).forEach(o=>{const a=o.getAttribute("data-ref");a&&r.has(a.toLowerCase())?o.style.display="none":o.style.display=""})}function E(){l().querySelectorAll(y).forEach(t=>{t.style.display=""})}function R(i){if(!i)return null;const t=l().querySelector(".nav-content-item.recent");if(!t)return null;const o=new MutationObserver(()=>{setTimeout(()=>g(),100)});return o.observe(t,{childList:!0,subtree:!0}),o}function T(){return`
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
  `}function L(){return T()}/**
 * Clean Sidebar - Logseq Plugin
 *
 * Simplifies the Logseq sidebar by allowing users to hide
 * unused navigation elements.
 *
 * @author Aru
 * @license MIT
 */let d=null,c=null;function q(){logseq.useSettingsSchema(C)}function I(){logseq.provideStyle(L())}function v(){try{const i=logseq.settings;S(i);const t=(i?.favoritesSortOrder??n.favoritesSortOrder)==="Alfabético";d&&(d.disconnect(),d=null),c&&(c.disconnect(),c=null),t&&p(),d=O(t);const o=i?.hideFavoritesFromRecents??n.hideFavoritesFromRecents;o?g():E(),c=R(o)}catch(i){console.error("[Clean Sidebar] Failed to apply settings:",i)}}async function G(){console.info("[Clean Sidebar] Plugin loaded"),q(),I(),setTimeout(v,500),logseq.onSettingsChanged(v),logseq.beforeunload(async()=>{k(),d&&d.disconnect(),c&&c.disconnect()})}logseq.ready(G).catch(i=>{console.error("[Clean Sidebar] Failed to initialize:",i)})})();
