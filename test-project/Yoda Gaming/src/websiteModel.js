/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import resolvePromise from "./resolvePromise.js";
import { getResultsSearch, getGameDetails, getGameScreenshots, yodafyText,getAllPlatforms } from "./websiteSource.js";

export default {
  yodafy: false, //Represents if the "standard" text should be yodafied or not
  savedPages: [],
  currentPage: null,
  currentPagePromiseState: {},
  searchParams: { minMetacritic: 0, maxMetacritic: 100, page_size: 10, asc: false},
  search: null, //Represents the current search, ex "Zelda" or "Nintendo", used in searchResults header
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
  currentLocation:"/",
  allPlatformsPromiseState:{},
  allUpvotes: [],
  showAbout: false, //for conditional rendering logic for about section on homepage
  currentCat:0, //current category used for homepage button disable functionality
  deleteState: false, //used in delete button functionality in saved pages
  inSearchResult: false, //used to determine if the user is in search, used for load more button functionality 
  showHistory:false,
  updateViewHistory:false,

  changeShowHistoryValue(){
    //(this.showHistory)
    if(this.showHistory===true)
    this.showHistory=false;
    else(this.showHistory=true)
    //console.log(this.showHistory)
  },

  changeUpdateViewHistoryValue(val){
    this.updateViewHistory=val;
  },

  updateAvailablePlatforms()
  {
    resolvePromise(getAllPlatforms(), this.allPlatformsPromiseState);
  },

  setCurrentLocation(newLocation)
  {
    this.currentLocation=newLocation;
  },

  //Model is initially just a modified version of dinnerModel, with minor changes when relevant

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
    this.setAlertVisability(true);
  },
  //Above handles sign out, not a similar for login since that requiers 2 methods no matter what, 
  //one for giving the info that it is logging in, while other handles login

  setLoggingIn(value) { this.loggingIn = value; },

  /* 
   setting the ID of page currently checked by the user.
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
  },

  setCurrentUser(value) {
    this.user = value;

    if (value != null) {

      this.setAlertBody("Signed In As : " + this.user.email);
      this.setAlertVisability(true);
    }
  },

  setSearch(query) {
    this.search = query;
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
  setSearchTags(tags) { this.searchParams.tags = tags },  //This represents what type of thing the user is searching, ex RPG or Publisher, meaning depends on category
  setSearchGenres(genres) { this.searchParams.genres = genres }, //

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
    this.setSearch(this.searchParams.search)//used for searchResults header, showing the user what they searched for
    if (alert) {
      this.setAlertBody("Searching");
      this.setAlertVisability(true);//Updates alert and shows it again
    }
    resolvePromise(getResultsSearch(this.searchParams), this.searchResultsPromiseState);

  },//TODO Ensure that the search function above can accept each category, and picks the correct function to get results from the API

  toggleShowAllTags() { //By Viktor Fredlund, toggles the showAllTags boolean
    if (this.showAllTags)
      this.showAllTags = false;
    else
      this.showAllTags = true;
  },
  addGameToSavedPages(){ //By Viktor Fredlund, adds the current page to the savedPages array
    if (!Array.isArray(this.savedPages))
      this.savedPages = [];
    const gameToAdd = {
      name: this.currentPagePromiseState.data.name,
      image: this.currentPagePromiseState.data.background_image,
      id: this.currentPage,
    };
    this.savedPages = [...this.savedPages, gameToAdd];
    //console.log(this.savedPages);
  },
  loadYodafyDescription(){ //By Viktor Fredlund, loads the yodafied description for the current game
    if (this.currentYodafiedDescription === this.currentPage)
      return;
    this.currentYodafiedDescription = this.currentPage;
    this.setYodafyValue(true);
    resolvePromise(yodafyText(this.currentPagePromiseState.data.description_raw), this.yodafiedDescriptionPromiseState);
  },
  toggleShowCoverImage(){ //By Viktor Fredlund, toggles the showCoverImage boolean
    if (this.showCoverImage)
      this.showCoverImage = false;
    else
      this.showCoverImage = true;
  },
  loadScreenshotsForCurrentGame(){ //By Viktor Fredlund, loads the screenshots for the current game
    if (this.currentScreenshotPage === this.currentPage){
      return;
    }
    this.currentScreenshotPage = this.currentPage;
    resolvePromise(getGameScreenshots(this.currentPage), this.currentGameScreenshotsPromiseState);
  },
  addCurrentPageToViewHistory(){ //By Viktor Fredlund, adds the current page to the viewHistory array
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
    //console.log("View history updated")
    //console.log(this.viewHistory);
    this.updateViewHistory=false;//set to false to prevent repetitive updates
  },

  setAllUpvotes(persistedAllUpvotes)
  {this.allUpvotes=persistedAllUpvotes},//For persistence

  updateAllUpvotes(idOfGame){ //By Viktor Fredlund, updates the allUpvotes array with the current user's upvotes
    const currentUserID = this.user.uid;
    if (!(this.allUpvotes.some(game => game.gameID === idOfGame))){
      console.log("Adding new game to allUpvotes")
      const gameUpvoteToAdd = {gameID: idOfGame, upvotes: [currentUserID]};
      this.allUpvotes = [...this.allUpvotes, gameUpvoteToAdd];
    }
    else{
      console.log("Updating upvotes for existing game")
      this.allUpvotes = this.allUpvotes.map(changeValueOfUpvoteCB);
      function changeValueOfUpvoteCB(game){
        if (game.gameID === idOfGame){
          const userHasAlreadyUpvoted = game.upvotes.includes(currentUserID);
          if (userHasAlreadyUpvoted)
            return {
              ...game, upvotes: game.upvotes.filter(id => id !== currentUserID),
            }
          else
            return {
              ...game, upvotes: [...game.upvotes, currentUserID],
            }
        }
        return game;
      }
      this.allUpvotes = this.allUpvotes.filter(game => game.upvotes.length > 0)
    } 
    //console.log(this.allUpvotes);
  },
  
  hasUserUpvotedGame(idOfGame){ //By Viktor Fredlund, returns true if the user has upvoted the game, false otherwise
    const game = this.allUpvotes.find(game => game.gameID === idOfGame);
    if (!game)
      return false;
    return game.upvotes.includes(this.user.uid);
  },
  setShowAbout(val){
    this.showAbout=val;
  },

  setCurrentCat(num){
    this.currentCat=num;
  },

  setDeleteStateFalse(){
    this.deleteState=false;
  },

  toggleDeleteState(){
    if (this.deleteState)
      this.deleteState = false;
    else
      this.deleteState = true;
  },

  setInSearchResultTrue(){
    this.inSearchResult = true;
  },

  setInSearchResultFalse(){
    this.inSearchResult = false;
  },

  headerTitleClicked()
  {
    
    this.setCurrentCat(0);//to disable title click to prevent unnecessary searches
    this.nullifySearchParams()
    this.setSearchMinMetacritic(50);
    this.setSearchMaxMetacritic(100);
    this.setDates("2015-01-01,2023-12-31");
    this.doSearch(false); //refresh searchResults from previous searches
    this.setShowAbout(false); //functionality to not render about page
  },

  nullifySearchParams()
  {
    this.searchParams={};
  },
};
