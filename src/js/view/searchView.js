import { elements } from "../view/base";

export const getInput = () => elements.serachField.value;

export const clearInput = () => (elements.serachField.value = "");

export const clearSearchResults = () => {
  const { searchResultsList: a, resultsPages: b } = elements;
  a.innerHTML = "";
  b.innerHTML = "";
};

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

export const renderSearchResults = (results, page = 1, resPerPage = 10) => {
  // Rendering recipe lists
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  results.slice(start, end).forEach(renderRecipe);

  // Rendering pagenaiton button
  renderButtons(page, results.length, resPerPage);
};

const renderButtons = (page, numResults, resPerPage) => {
  const total = Math.ceil(numResults / resPerPage);
  let button;
  if (page === 1 && total > 1) {
    // Only 'next' button
    button = createButton(page, "next");
  } else if (page < total) {
    // Both 'next' and 'prev' button
    button = `${createButton(page, "prev")} ${createButton(page, "next")}`;
  } else if (page === total && total > 1) {
    //　Only 'Prev' button
    button = createButton(page, "prev");
  }

  elements.resultsPages.insertAdjacentHTML("beforeend", button);
};

const createButton = (page, type) => `
      <button class="btn-inline results__btn--${type}" data-goto=${
  type === "next" ? page + 1 : page - 1
}>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${
                type === "next" ? "right" : "left"
              }"></use>
          </svg>
          <span>Page ${type === "next" ? page + 1 : page - 1}</span>
      </button>  `;
