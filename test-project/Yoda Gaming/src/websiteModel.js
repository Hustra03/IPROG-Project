/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import resolvePromise from "./resolvePromise.js";
import {getResultsSearch} from "./websiteSource.js";

export default {
  yodafy:false, //Represents if the "standard" text should be yodafied or not
  savedPages: [],
  currentPage: null,
  currentPagePromiseState: {},
  searchParams: {},
  searchResultsPromiseState: {},

  //Model is initially just a modified version of dinnerModel, with minor changes when relevant

  addToSavedPage(pageToAdd, initialCategory) {
    const savedPage={actualPage:pageToAdd,category:initialCategory};
    this.savedPages = [...this.savedPages, (savedPage)];
  },//By Erik Paulinder, saves the current page with a specified category

  removeFromSavedPages(pageToRemove) {
    function shouldWeKeePageCB(page) {
      return page.id !== pageToRemove.id; //TODO Check that each page has an id parameter, and what it is called if it is not id
    }
    this.savedPages = this.savedPages.filter(shouldWeKeePageCB);

  },//By Erik Paulinder, saves the current page with a specified category

  /* 
   setting the ID of dish currently checked by the user.
   A strict MVC/MVP Model would not keep such data, 
   but we take a more relaxed, "Application state" approach. 
   So we store also abstract data that will influence the application status.
 */
  setPage(id) {
    if (id !== this.currentDish && id !== null && Number.isInteger(id)) { //TODO Check that each page has an id parameter, and what it is called if it is not id
      resolvePromise(getDishDetails(id), this.currentPagePromiseState);
      this.currentPage=id; // Is this correct, it works but i do not think it is 
    }

    // note that we are adding a new object property (currentDish) which was not initialized in the constructor
  },
  // more methods will be added here, don't forget to separate them with comma!

  toggleYodafyValue()
  {this.yodafy=!this.yodafy;},

  setSearchQuery(query) {this.searchParams.query = query}, //This represents the text string the user wishes to search for, ex "Zelda" or "Nintendo", meaning depends on category
  setSearchType(type) {this.searchParams.type = type},  //This represents what type of thing the user is searching, ex RPG or Publisher, meaning depends on category
  setSearchCategory(category) {this.searchParams.category = category},  //This represents what category of thing the user is searching, ex game or company ect.
  setSearchSortBy(SortBy) {this.searchParams.SortBy = SortBy},  //This represents what results should be sorted by, ex "Rating" or "Release Date", , meaning depends on category
  //TODO Add more search parameters, exactly which depends on implementation of search
  
  doSearch(searchParams) {
    resolvePromise(getResultsSearch(searchParams), this.searchResultsPromiseState);
  },//TODO Ensure that the search function above can accept each category, and picks the correct function to get results from the API

};
