import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      // 1) Get recipe data from external API
      const res = await axios.get(
        `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
      );

      // 2) Set recipe data to 'results' property
      this.results = res.data.recipes;
    } catch (err) {
      alert("Something went wrong with searching for recipe lists");
    }
  }
}
