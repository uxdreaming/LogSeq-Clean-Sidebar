(function(){"use strict";const l="clean-sidebar",a={hideJournals:!1,hideWhiteboards:!0,hideFlashcards:!0,hideGraph:!1,hideAllPages:!1,hideCreate:!1,favoritesSortOrder:"manual",hideFavoritesFromRecents:!0,hideCheckboxes:!0},C=[{key:"hideJournals",type:"boolean",default:a.hideJournals,title:"Ocultar Diarios",description:"Oculta la sección de Diarios de la barra lateral"},{key:"hideWhiteboards",type:"boolean",default:a.hideWhiteboards,title:"Ocultar Pizarras",description:"Oculta la sección de Pizarras de la barra lateral"},{key:"hideFlashcards",type:"boolean",default:a.hideFlashcards,title:"Ocultar Tarjetas de memorización",description:"Oculta la sección de Tarjetas de memorización de la barra lateral"},{key:"hideGraph",type:"boolean",default:a.hideGraph,title:"Ocultar Vista de Grafo",description:"Oculta la sección de Vista de Grafo de la barra lateral"},{key:"hideAllPages",type:"boolean",default:a.hideAllPages,title:"Ocultar Lista de páginas",description:"Oculta la sección de Lista de páginas de la barra lateral"},{key:"hideCreate",type:"boolean",default:a.hideCreate,title:"Ocultar Crear",description:"Oculta el botón Crear de la barra lateral"},{key:"_favoritesHeading",type:"heading",title:"Favoritos",description:""},{key:"favoritesSortOrder",type:"enum",default:a.favoritesSortOrder,title:"Orden",description:"",enumChoices:["Alfabético","Manual"],enumPicker:"radio"},{key:"_recentsHeading",type:"heading",title:"Recientes",description:""},{key:"hideFavoritesFromRecents",type:"boolean",default:a.hideFavoritesFromRecents,title:"Ocultar duplicados",description:"No mostrar en Recientes las páginas que se encuentran en Favoritos"},{key:"_uiHeading",type:"heading",title:"Interfaz",description:""},{key:"hideCheckboxes",type:"boolean",default:a.hideCheckboxes,title:"Ocultar checkboxes y menús",description:"Oculta los checkboxes y los botones de menú (tres puntos) en Favoritos y Recientes"}],e={plugin:l,hideJournals:`${l}-hide-journals`,hideWhiteboards:`${l}-hide-whiteboards`,hideFlashcards:`${l}-hide-flashcards`,hideGraph:`${l}-hide-graph`,hideAllPages:`${l}-hide-all-pages`,hideCreate:`${l}-hide-create`,hideCheckboxes:`${l}-hide-checkboxes`,active:`${l}-active`};function d(){return parent.document}function f(){return d().body}function S(i){const r=f();if(!r){console.warn("[Clean Sidebar] Body element not found");return}const t={...a,...i},n=[[e.hideJournals,t.hideJournals],[e.hideWhiteboards,t.hideWhiteboards],[e.hideFlashcards,t.hideFlashcards],[e.hideGraph,t.hideGraph],[e.hideAllPages,t.hideAllPages],[e.hideCreate,t.hideCreate],[e.hideCheckboxes,t.hideCheckboxes]];n.forEach(([s,u])=>{r.classList.toggle(s,u)});const o=n.some(([,s])=>s);r.classList.toggle(e.active,o)}function k(){const i=f();i&&Object.values(e).forEach(r=>{i.classList.remove(r)})}const b="ul.favorites",x="li.favorite-item";function F(){const r=d().querySelector(b);return r?Array.from(r.querySelectorAll(x)):[]}function m(i){return i.querySelector(".page-title")?.textContent?.trim().toLowerCase()??""}function p(){const r=d().querySelector(b);if(!r)return;const t=F();if(t.length===0)return;[...t].sort((o,s)=>{const u=m(o),G=m(s);return u.localeCompare(G)}).forEach(o=>{r.appendChild(o)})}function O(i){if(!i)return null;const t=d().querySelector(b);if(!t)return null;const n=new MutationObserver(()=>{setTimeout(()=>p(),100)});return n.observe(t,{childList:!0,subtree:!1}),n}const $=".favorite-item, ul.favorites li, .nav-content-item.favorite .nav-content-item",y=".recent-item, .nav-content-item.recent .nav-content-item";function A(){const r=d().querySelectorAll($),t=new Set;return r.forEach(n=>{let o=n.getAttribute("data-ref");if(!o){const s=n.querySelector("a");s&&(o=s.textContent?.trim()||"")}o&&t.add(o.toLowerCase())}),t}function g(){const i=d(),r=A();if(r.size===0)return;i.querySelectorAll(y).forEach(n=>{let o=n.getAttribute("data-ref");if(!o){const s=n.querySelector("a");s&&(o=s.textContent?.trim()||"")}o&&r.has(o.toLowerCase())?n.classList.add("clean-sidebar-hidden"):n.classList.remove("clean-sidebar-hidden")})}function E(){d().querySelectorAll(y).forEach(t=>{t.style.display=""})}function R(i){if(!i)return null;const t=d().querySelector(".nav-content-item.recent");if(!t)return null;const n=new MutationObserver(()=>{setTimeout(()=>g(),100)});return n.observe(t,{childList:!0,subtree:!0}),n}function L(){return`
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

    /* High specificity to override LogSeq styles without !important */
    html body #app-container .left-sidebar-inner .nav-content-item.recent li.recent-item.clean-sidebar-hidden,
    html body #app-container .left-sidebar-inner li.recent-item.clean-sidebar-hidden {
      display: none;
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
  `}function T(){return L()}/**
 * Clean Sidebar - Logseq Plugin
 *
 * Simplifies the Logseq sidebar by allowing users to hide
 * unused navigation elements.
 *
 * @author Aru
 * @license MIT
 */let c=null,h=null;function q(){logseq.useSettingsSchema(C)}function I(){logseq.provideStyle(T())}function v(){try{const i=logseq.settings;S(i);const t=(i?.favoritesSortOrder??a.favoritesSortOrder)==="Alfabético";c&&(c.disconnect(),c=null),h&&(h.disconnect(),h=null),t&&p(),c=O(t);const n=i?.hideFavoritesFromRecents??a.hideFavoritesFromRecents;n?g():E(),h=R(n)}catch(i){console.error("[Clean Sidebar] Failed to apply settings:",i)}}async function w(){console.info("[Clean Sidebar] Plugin loaded"),q(),I(),setTimeout(v,500),logseq.onSettingsChanged(v),logseq.beforeunload(async()=>{k(),c&&c.disconnect(),h&&h.disconnect()})}logseq.ready(w).catch(i=>{console.error("[Clean Sidebar] Failed to initialize:",i)})})();
