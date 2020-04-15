import ctrlSearch from "./searchCtrl";
import * as searchView from "../view/searchView";
import { elements } from "../view/base";

// Gobal State //
const state = {};
/**
 * Search Instance
 * Recipe Instance
 * Shopping List Instace
 * Liked Instace
 */

// SEARCH CONTROLLER //
elements.serach.addEventListener("submit", (e) => {
  e.preventDefault();
  ctrlSearch();
});

// PAGENATION //
elements.resultsPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goTo = parseInt(btn.dataset.goto, 10);
    searchView.clearSearchResults();
    searchView.renderSearchResults(state.search.results, goTo);
  }
});

export default state;
