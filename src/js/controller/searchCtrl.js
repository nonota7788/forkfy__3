import state from "./index";
import Serach from "../model/Search";
import * as searchView from "../view/searchView";
import { elements, renderLoader, clearLoader } from "../view/base";

export default async () => {
  // 1) Get a recipe keyword from DOM (V)
  const query = searchView.getInput();

  if (query) {
    // 2) Prepare UI (V) //TODO
    searchView.clearInput();
    searchView.clearSearchResults();
    renderLoader(elements.searchResults);

    // 3) Create Search instance and add it to the state (M)
    state.search = new Serach(query);

    try {
      // 4) Request search results from external API uisng the recipe keyword (M)
      await state.search.getResults();
      clearLoader(elements.searchResults);

      // 5) Render serach results on DOM (V)
      searchView.renderSearchResults(state.search.results);
    } catch (err) {
      alert("Something went wrong with searching");
    }
  }
};
