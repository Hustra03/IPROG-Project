/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import resolvePromise from "./resolvePromise.js";
import { getResultsSearch, getGameDetails, getGameScreenshots, yodafyText } from "./websiteSource.js";

export default {
  yodafy: false, //Represents if the "standard" text should be yodafied or not
  savedPages: [],
  currentPage: null,
  currentPagePromiseState: {},
  searchParams: { minMetacritic: 0, maxMetacritic: 100, page_size: 10, asc: false},
  searchResultsPromiseState: {},
  user: null, // Represents the current user
  loggingIn: null, // Represents if the user is currently logging in or not
  alertBody: null, // Contains the text to be shown in notifications
  alertVisability: true, // States if notification is to be shown or not
  raceConditionAvoidance:null, //To avoid race conditions for alerts, random value between 0 and 1
  showAllTags: false,
  currentGameScreenshotsPromiseState: {},
  currentScreenshotPage: null,
  yodafiedDescriptionPromiseState: {},
  currentYodafiedDescription: null,
  showCoverImage: false,
  viewHistory: [],
  allUpvotes: [],
  userUpvotes: [],


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

  clearSavedPages() {
    this.savedPages=[];
  },

  //For persistence
  setSavedPages(savedPages) { this.savedPages = savedPages; },

  setAlertBody(alertBody) { this.alertBody = alertBody; },
  setAlertVisability(alertVisability) { 
    this.alertVisability = alertVisability; 
    this.raceConditionAvoidance=Math.random(); 
    this.asyncCall(this.raceConditionAvoidance);
   },

  resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  },

  async asyncCall(oldRaceConditionAvoidance) {
    await this.resolveAfter2Seconds();
    if (this.raceConditionAvoidance==oldRaceConditionAvoidance) {
      this.setAlertVisability(false);
    }
  },

  //Above is a bootleg timed dismiss
  //It is called whenever is called setAlertVisability, and sets it to false after 2 seconds
  //TODO get above checked by Coach, so that it is an ok implementation


  signOut()
  {
    this.setAlertBody(this.user.email + " Logged Out");
    this.setLoggingIn(false);
    this.setCurrentUser(null);
    this.setAlertVisability(true);
  },
  //Above handles sign out, not a similar for login since that requiers 2 methods no matter what, 
  //one for giving the info that it is logging in, while other handles login

  setLoggingIn(value) { this.loggingIn = value; },

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
      if (id) {
        this.currentPage = id;
        this.currentGameScreenshotsPromiseState.data = null;
        this.yodafiedDescriptionPromiseState.data = null;
        resolvePromise(getGameDetails(id), this.currentPagePromiseState);
      }
    }

    // note that we are adding a new object property (currentDish) which was not initialized in the constructor
  },
  // more methods will be added here, don't forget to separate them with comma!

  setCurrentUser(value) {
    this.user = value;

    if (value != null) {

      this.setAlertBody("Signed In As : " + this.user.email);
      this.setAlertVisability(true);
    }
  },

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

  setSearchPageLimit(page_size) { this.searchParams.page_size = page_size; },
  setSearchFuzzyDisabled(fuzzy) { this.searchParams.fuzzy = fuzzy },  //
  setSearchExactOnlyDisabled(exact) { this.searchParams.exact = exact },  //
  setDates(dates) { this.searchParams.dates = dates },
  setPlatform(platform) { this.searchParams.platforms = platform },

  setAsc(asc) { this.searchParams.asc = asc },

  setSearchOrdering(ordering) { this.searchParams.ordering = ordering },  //This represents what results should be sorted by, ex "Rating" or "Release Date", , meaning depends on category
  //TODO Add more search parameters, exactly which depends on implementation of search

  //First parameter boolean determines if alert is to be updated, false for initial search
  doSearch(alert) {
    if (alert) {
      this.setAlertBody("Searching");
      this.setAlertVisability(true);//Updates alert and shows it again
    }
    resolvePromise(getResultsSearch(this.searchParams), this.searchResultsPromiseState);

  },//TODO Ensure that the search function above can accept each category, and picks the correct function to get results from the API

  toggleShowAllTags() {
    if (this.showAllTags)
      this.showAllTags = false;
    else
      this.showAllTags = true;
  },
  addGameToSavedPages(){
    if (!Array.isArray(this.savedPages))
      this.savedPages = [];
    const gameToAdd = {
      name: this.currentPagePromiseState.data.name,
      image: this.currentPagePromiseState.data.background_image,
      id: this.currentPage,
    };
    this.savedPages = [...this.savedPages, gameToAdd];
    console.log(this.savedPages);
  },
  toggleYodafyDescription(){
    this.toggleYodafyValue();
    if (this.currentYodafiedDescription === this.currentPage)
      return;
    this.currentYodafiedDescription = this.currentPage;
    resolvePromise(yodafyText(this.currentPagePromiseState.data.description_raw), this.yodafiedDescriptionPromiseState);
  },
  toggleShowCoverImage(){
    if (this.showCoverImage)
      this.showCoverImage = false;
    else
      this.showCoverImage = true;
  },
  loadScreenshotsForCurrentGame(){
    if (this.currentScreenshotPage === this.currentPage){
      return;
    }
    this.currentScreenshotPage = this.currentPage;
    resolvePromise(getGameScreenshots(this.currentPage), this.currentGameScreenshotsPromiseState);
  },
  addCurrentPageToViewHistory(){
    const pageToAdd = {
      name: this.currentPagePromiseState.data.name,
      image: this.currentPagePromiseState.data.background_image,
      id: this.currentPage,
    };
    if (!Array.isArray(this.viewHistory))
      this.viewHistory = [];
    function removePageFromViewHistoryCB(page) {
      return page.id !== pageToAdd.id;
    }
    this.viewHistory = this.viewHistory.filter(removePageFromViewHistoryCB);
    this.viewHistory = [...this.viewHistory, pageToAdd];
    console.log(this.viewHistory);
  },
  toggleUserUpvote(id){
    if (this.userUpvotes.includes(id)){
      this.userUpvotes = this.userUpvotes.filter(gameID => gameID !== id);
      this.updateAllUpvotes(id, false);
    }
    else{
      this.userUpvotes = [...this.userUpvotes, id];
      this.updateAllUpvotes(id, true);
    }
  },
  updateAllUpvotes(id, boolean){
    if (!(this.allUpvotes.some(game => game.id === id))){
      const upvoteToAdd = {gameID: id, upvotes: 1};
      this.allUpvotes = [...this.allUpvotes, upvoteToAdd];
    }
    else{
      this.allUpvotes = this.allUpvotes.map(changeValueOfUpvoteCB);
      function changeValueOfUpvoteCB(game){
        if (game.id === id){
          if (boolean)
            game.upvotes++;
          else
            game.upvotes--;
        }
        return game;
      }
    } 
  },
};
