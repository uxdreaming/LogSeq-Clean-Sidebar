(function(){"use strict";const s="clean-sidebar",o={hideJournals:!1,hideWhiteboards:!0,hideFlashcards:!0,hideGraph:!1,hideAllPages:!1,hideCreate:!1,favoritesSortOrder:"manual",hideFavoritesFromRecents:!0},S=[{key:"hideJournals",type:"boolean",default:o.hideJournals,title:"Ocultar Diarios",description:"Oculta la sección de Diarios de la barra lateral"},{key:"hideWhiteboards",type:"boolean",default:o.hideWhiteboards,title:"Ocultar Pizarras",description:"Oculta la sección de Pizarras de la barra lateral"},{key:"hideFlashcards",type:"boolean",default:o.hideFlashcards,title:"Ocultar Tarjetas de memorización",description:"Oculta la sección de Tarjetas de memorización de la barra lateral"},{key:"hideGraph",type:"boolean",default:o.hideGraph,title:"Ocultar Vista de Grafo",description:"Oculta la sección de Vista de Grafo de la barra lateral"},{key:"hideAllPages",type:"boolean",default:o.hideAllPages,title:"Ocultar Lista de páginas",description:"Oculta la sección de Lista de páginas de la barra lateral"},{key:"hideCreate",type:"boolean",default:o.hideCreate,title:"Ocultar Crear",description:"Oculta el botón Crear de la barra lateral"},{key:"_favoritesHeading",type:"heading",title:"Favoritos",description:""},{key:"favoritesSortOrder",type:"enum",default:o.favoritesSortOrder,title:"Orden",description:"",enumChoices:["Alfabético","Manual"],enumPicker:"radio"},{key:"_recentsHeading",type:"heading",title:"Recientes",description:""},{key:"hideFavoritesFromRecents",type:"boolean",default:o.hideFavoritesFromRecents,title:"Ocultar duplicados",description:"No mostrar en Recientes las páginas que se encuentran en Favoritos"}],a={plugin:s,hideJournals:`${s}-hide-journals`,hideWhiteboards:`${s}-hide-whiteboards`,hideFlashcards:`${s}-hide-flashcards`,hideGraph:`${s}-hide-graph`,hideAllPages:`${s}-hide-all-pages`,hideCreate:`${s}-hide-create`,active:`${s}-active`};function l(){return parent.document}function b(){return l().body}function C(e){const r=b();if(!r){console.warn("[Clean Sidebar] Body element not found");return}const t={...o,...e},i=[[a.hideJournals,t.hideJournals],[a.hideWhiteboards,t.hideWhiteboards],[a.hideFlashcards,t.hideFlashcards],[a.hideGraph,t.hideGraph],[a.hideAllPages,t.hideAllPages],[a.hideCreate,t.hideCreate]];i.forEach(([u,f])=>{r.classList.toggle(u,f)});const n=i.some(([,u])=>u);r.classList.toggle(a.active,n)}function F(){const e=b();e&&Object.values(a).forEach(r=>{e.classList.remove(r)})}const h="ul.favorites",O="li.favorite-item";function E(){const r=l().querySelector(h);return r?Array.from(r.querySelectorAll(O)):[]}function g(e){return e.querySelector(".page-title")?.textContent?.trim().toLowerCase()??""}function p(){const r=l().querySelector(h);if(!r)return;const t=E();if(t.length===0)return;[...t].sort((n,u)=>{const f=g(n),w=g(u);return f.localeCompare(w)}).forEach(n=>{r.appendChild(n)})}function A(e){if(!e)return null;const t=l().querySelector(h);if(!t)return null;const i=new MutationObserver(()=>{setTimeout(()=>p(),100)});return i.observe(t,{childList:!0,subtree:!1}),i}const T="ul.favorites li.favorite-item",y=".nav-content-item.recent .recent-item";function R(){const r=l().querySelectorAll(T),t=new Set;return r.forEach(i=>{const n=i.getAttribute("data-ref");n&&t.add(n.toLowerCase())}),t}function m(){const e=l(),r=R();if(r.size===0)return;e.querySelectorAll(y).forEach(i=>{const n=i.getAttribute("data-ref");n&&r.has(n.toLowerCase())?i.style.display="none":i.style.display=""})}function L(){l().querySelectorAll(y).forEach(t=>{t.style.display=""})}function q(e){if(!e)return null;const t=l().querySelector(".nav-content-item.recent");if(!t)return null;const i=new MutationObserver(()=>{setTimeout(()=>m(),100)});return i.observe(t,{childList:!0,subtree:!0}),i}function I(){return`
    /* =========================================
       Clean Sidebar - Element Visibility
       ========================================= */

    /* Journals/Diarios
       Selector targets: a.item containing .ls-icon-calendar */
    html body.${a.hideJournals} .left-sidebar-inner a.item:has(.ls-icon-calendar) {
      display: none;
    }

    /* Whiteboards/Pizarras
       Selector targets: div.whiteboard container */
    html body.${a.hideWhiteboards} .left-sidebar-inner div.whiteboard {
      display: none;
    }

    /* Flashcards/Tarjetas de memorización
       Selector targets: div.flashcards-nav container */
    html body.${a.hideFlashcards} .left-sidebar-inner div.flashcards-nav {
      display: none;
    }

    /* Graph/Vista de Grafo
       Selector targets: a.item containing .ls-icon-hierarchy */
    html body.${a.hideGraph} .left-sidebar-inner a.item:has(.ls-icon-hierarchy) {
      display: none;
    }

    /* All Pages/Lista de páginas
       Selector targets: div.all-pages-nav container */
    html body.${a.hideAllPages} .left-sidebar-inner div.all-pages-nav {
      display: none;
    }

    /* Create/Crear
       Selector targets: button#create-button */
    html body.${a.hideCreate} .left-sidebar-inner #create-button {
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
  `}function G(){return I()}/**
 * Clean Sidebar - Logseq Plugin
 *
 * Simplifies the Logseq sidebar by allowing users to hide
 * unused navigation elements.
 *
 * @author Aru
 * @license MIT
 */let d=null,c=null;function P(){logseq.useSettingsSchema(S)}function $(){logseq.provideStyle(G())}function v(){try{const e=logseq.settings;C(e);const t=(e?.favoritesSortOrder??o.favoritesSortOrder)==="Alfabético";d&&(d.disconnect(),d=null),c&&(c.disconnect(),c=null),t&&p(),d=A(t);const i=e?.hideFavoritesFromRecents??o.hideFavoritesFromRecents;i?m():L(),c=q(i)}catch(e){console.error("[Clean Sidebar] Failed to apply settings:",e)}}async function k(){console.info("[Clean Sidebar] Plugin loaded"),P(),$(),setTimeout(v,500),logseq.onSettingsChanged(v),logseq.beforeunload(async()=>{F(),d&&d.disconnect(),c&&c.disconnect()})}logseq.ready(k).catch(e=>{console.error("[Clean Sidebar] Failed to initialize:",e)})})();
