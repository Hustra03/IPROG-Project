/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import resolvePromise from "./resolvePromise.js";
import { getResultsSearch, getGameDetails } from "./websiteSource.js";

export default {
  yodafy: false, //Represents if the "standard" text should be yodafied or not
  savedPages: [],
  currentPage: null,
  currentPagePromiseState: {},
  searchParams: {minMetacritic:0,maxMetacritic:100,page_size:10,asc:false},
  searchResultsPromiseState: {},
  user: null,
  loggingIn:null,
  toastBody:null,
  showAllTags: false,


  //Model is initially just a modified version of dinnerModel, with minor changes when relevant

  addToSavedPage(pageToAdd, initialCategory) {
    const savedPage = { actualPage: pageToAdd, category: initialCategory };
    this.savedPages = [...this.savedPages, (savedPage)];
  },//By Erik Paulinder, saves the current page with a specified category

  removeFromSavedPages(pageToRemove) {
    function shouldWeKeePageCB(page) {
      return page.id !== pageToRemove.id; //TODO Check that each page has an id parameter, and what it is called if it is not id
    }
    this.savedPages = this.savedPages.filter(shouldWeKeePageCB);

  },//By Erik Paulinder, saves the current page with a specified category

  //For persistence
  setSavedPages(savedPages)
  {this.savedPages=savedPages; },

  setToastBody(toastBody)
  {this.toastBody=toastBody; },

  setLoggingIn(value)
  {this.loggingIn=value;},

  /* 
   setting the ID of dish currently checked by the user.
   A strict MVC/MVP Model would not keep such data, 
   but we take a more relaxed, "Application state" approach. 
   So we store also abstract data that will influence the application status.
 */
  setPage(id) {
    if (id !== this.currentPage && id !== null && Number.isInteger(id)) { //TODO Check that each page has an id parameter, and what it is called if it is not id
      if (this.currentPage === id)
        return;
      if (id){
        this.currentPage = id;
        resolvePromise(getGameDetails(id), this.currentPagePromiseState);
      }
    }

    // note that we are adding a new object property (currentDish) which was not initialized in the constructor
  },
  // more methods will be added here, don't forget to separate them with comma!

  setCurrentUser(value)
  {this.user=value;},

  toggleYodafyValue() {
    if (this.yodafy) {

      this.yodafy = false;
    }
    else { this.yodafy = true; }
  },
  setYodafyValue(value) { this.yodafy = value; },

  setSearchParams(params) { this.searchParams = params }, //Sets all of the search params, used for persistence
  setSearchQuery(query) { this.searchParams.search = query }, //This represents the text string the user wishes to search for, ex "Zelda" or "Nintendo", meaning depends on category
  setSearchType(type) { this.searchParams.tags = type },  //This represents what type of thing the user is searching, ex RPG or Publisher, meaning depends on category
  setSearchGenre(genre) { this.searchParams.genres = genre }, //
  
  setSearchMinMetacritic(minMetacritic) { this.searchParams.minMetacritic = minMetacritic },  //
  setSearchMaxMetacritic(maxMetacritic) { this.searchParams.maxMetacritic = maxMetacritic },  //

  setSearchPageLimit(page_size){this.searchParams.page_size=page_size;},
  setSearchFuzzyDisabled(fuzzy) { this.searchParams.fuzzy = fuzzy },  //
  setSearchExactOnlyDisabled(exact) { this.searchParams.exact = exact },  //
  setDates(dates){this.searchParams.dates = dates},
  setPlatform(platform){this.searchParams.platform = platform},

  setAsc(asc){this.searchParams.asc = asc},

  setSearchOrdering(ordering) { this.searchParams.ordering = ordering },  //This represents what results should be sorted by, ex "Rating" or "Release Date", , meaning depends on category
  //TODO Add more search parameters, exactly which depends on implementation of search

  doSearch(searchParams) {
    resolvePromise(getResultsSearch(searchParams), this.searchResultsPromiseState);
  },//TODO Ensure that the search function above can accept each category, and picks the correct function to get results from the API

  toggleShowAllTags(){
    if (this.showAllTags) {
      this.showAllTags = false;
    }
    else { 
      this.showAllTags = true; 
    }
  },
};
