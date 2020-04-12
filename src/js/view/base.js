export const elements = {
  serach: document.querySelector(".search"),
  serachField: document.querySelector(".search__field"),
  searchResults: document.querySelector(".results"),
  searchResultsList: document.querySelector(".results__list"),
  resultsPages: document.querySelector(".results__pages"),
};

const elementStrings = {
  loader: "loader",
};

const createLoader = () => `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
`;

export const renderLoader = (parent) =>
  parent.insertAdjacentHTML("afterbegin", createLoader());

export const clearLoader = (parent) => {
  //Get loader node from DOM
  const loader = document.querySelector(`.${elementStrings.loader}`);

  // Remove loader from DOM
  parent.removeChild(loader);
};
