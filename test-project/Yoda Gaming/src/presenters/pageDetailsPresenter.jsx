import PageDetailsView from '../views/pageDetailsView.jsx';
import {getCurrentGameUpvotes} from '../utilities.js';
        //file mainly worked on by Viktor Fredlund
import { LoadingView } from "../views/loadingView.jsx";
import NoDataFoundView from "../views/noDataFoundView.jsx";

export default
function Details(props) {
    
    function showDetailsViewOrNot(currentPagePromiseState){
        if(!currentPagePromiseState.promise){
            return(<NoDataFoundView/>)
        }
        if(!currentPagePromiseState.data && !currentPagePromiseState.error){
            return(<LoadingView/> )
        }
        if(!currentPagePromiseState.data && currentPagePromiseState.error){
            return(
                <div>
                    <p>{props.model.currentPagePromiseState.error}</p>
                </div>
            )
        }
        if(currentPagePromiseState.data && !currentPagePromiseState.error){
            return (
                <div>
                    <PageDetailsView 
                    gameDetails={props.model.currentPagePromiseState.data} 
                    gameScreenshots={props.model.currentGameScreenshotsPromiseState.data}
                    yodafiedDescriptionText={props.model.yodafiedDescriptionPromiseState.data}
                    yodafy={props.model.yodafy}
                    showAllTags={props.model.showAllTags} 
                    savedPages={props.model.savedPages}
                    showCoverImage={props.model.showCoverImage}
                    toggleShowingTagsCustomEvent={showAllTagsCustomEventHandlerACB} 
                    addGameToSavedPagesCustomEvent={addGameToSavedPagesCustomEventHandlerACB}
                    removeGameToSavedPagesCustomEvent={removeGameToSavedPagesCustomEventHandlerACB}
                    loggedIn={props.model.user}
                    loadScreenshotsCustomEvent={loadScreenshotsCustomEventHandlerACB}
                    toggleShowCoverImageCustomEvent={toggleShowCoverImageCustomEventHandlerACB}
                    toggleYodafyDescriptionCustomEvent={toggleYodafyDescriptionCutomEventHandlerACB}
                    toggleUpvoteGameCustomEvent={toggleUpvoteGameCustomEventHandlerACB}
                    totalUpvotesForCurrentGame={getCurrentGameUpvotes(props.model.allUpvotes, props.model.currentPagePromiseState.data.id)}
                    hasUserUpvotedGameCustomEvent={hasUserUpvotedGameCustomEventHandlerACB}
                    loadYodafyDescriptionCustomEvent={loadYodafyDescriptionCustomEventHandlerACB}
                    addCurrentPageToViewHistoryCustomEvent={addCurrentPageToViewHistoryCustomEventHandlerACB}
                    shouldViewHistoryUpdate={props.model.updateViewHistory}//boolean should you update view history?
                    />
                </div>
            );
        }
    }
    
    function showAllTagsCustomEventHandlerACB(){
        props.model.toggleShowAllTags();
    }
    function addGameToSavedPagesCustomEventHandlerACB(){
        props.model.addGameToSavedPages();
    }
    function removeGameToSavedPagesCustomEventHandlerACB(game){
        props.model.removeFromSavedPages(game);
    }
    function toggleYodafyDescriptionCutomEventHandlerACB(){
        props.model.toggleYodafyValue();
    }
    function toggleShowCoverImageCustomEventHandlerACB(){
        props.model.toggleShowCoverImage();
    }
    function loadScreenshotsCustomEventHandlerACB(){
        props.model.loadScreenshotsForCurrentGame();
    }
    function toggleUpvoteGameCustomEventHandlerACB(id){
        props.model.updateAllUpvotes(id);
    }
    function hasUserUpvotedGameCustomEventHandlerACB(id){
        return props.model.hasUserUpvotedGame(id);
    }
    function loadYodafyDescriptionCustomEventHandlerACB(){
        props.model.loadYodafyDescription();
    }
    function addCurrentPageToViewHistoryCustomEventHandlerACB(){
        props.model.addCurrentPageToViewHistory();
    }
    return (
        <div>
            {showDetailsViewOrNot(props.model.currentPagePromiseState)}
        </div>
    );
    
}