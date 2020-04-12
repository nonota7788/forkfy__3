import { elements } from "../view/base";

export const getInput = () => elements.serachField.value;

export const clearInput = () => (elements.serachField.value = "");

export const clearSearchResults = () =>
  (elements.searchResultsList.innerHTML = "");

const formatTitle = (title, limit = 17) => {
  if (title.length > limit) {
    const newTitle = title.split("").splice(0, limit).join("").trim();
    return `${newTitle}...`;
  }
  return title;
};

const createRecipeList = (recipe) => `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${formatTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;

const renderRecipe = (recipe) => {
  const html = createRecipeList(recipe);
  elements.searchResultsList.insertAdjacentHTML("beforeend", html);
};

export const renderSearchResults = (results, page = 1, perPage = 10) => {
  // 1) Render recipe lists
  const start = (page - 1) * perPage; //
  const end = page * perPage;
  results.slice(start, end).forEach(renderRecipe);

  // 2) Render pagenation buttons
  clearButtons();
  renderButtons(results.length, page, perPage);
};

const renderButtons = (numResults, page, perPage) => {
  // 0) Calculate total number of pages
  const totalPages = Math.ceil(numResults / perPage);

  // 1) Create button according to current page
  let buttons;
  if (page === 1 && totalPages > 1) {
    // 'next' button
    buttons = createButton(page, "next");
  } else if (page < totalPages) {
    // 'prev' and 'next' button
    buttons = `${createButton(page, "prev")} ${createButton(page, "next")}`;
  } else if (page === totalPages) {
    // 'prev' button
    buttons = createButton(page, "prev");
  }

  // 2) Render button into DOM
  elements.resultsPages.insertAdjacentHTML("afterbegin", buttons);
};

const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto="${
  type === "prev" ? page - 1 : page + 1
}">
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${
                type === "prev" ? "left" : "right"
              }"></use>
          </svg>
          <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        </button>`;

const clearButtons = () => (elements.resultsPages.innerHTML = "");
