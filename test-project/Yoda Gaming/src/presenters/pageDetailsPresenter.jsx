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
                    showAllTagsCustomEvent={showAllTagsCustomEventHandler} 
                    addGameToSavedPagesCustomEvent={addGameToSavedPagesCustomEventHandler}
                    removeGameToSavedPagesCustomEvent={removeGameToSavedPagesCustomEventHandler}
                    loggedIn={props.model.user}
                    loadScreenshotsCustomEvent={loadScreenshotsCustomEventHandler}
                    toggleShowCoverImageCustomEvent={toggleShowCoverImageCustomEventHandler}
                    toggleYodafyDescriptionCustomEvent={toggleYodafyDescriptionCutomEventHandler}
                    toggleUpvoteGameCustomEvent={toggleUpvoteGameCustomEventHandler}
                    totalUpvotesForCurrentGame={getCurrentGameUpvotes(props.model.allUpvotes, props.model.currentPagePromiseState.data.id)}
                    hasUserUpvotedGameCustomEvent={hasUserUpvotedGameCustomEventHandler}
                    loadYodafyDescriptionCustomEvent={loadYodafyDescriptionCustomEventHandler}
                    addCurrentPageToViewHistoryCustomEvent={addCurrentPageToViewHistoryCustomEventHandler}
                    shouldViewHistoryUpdate={props.model.updateViewHistory}//boolean should you update view history?
                    />
                </div>
            );
        }
    }
    
    function showAllTagsCustomEventHandler(){
        props.model.toggleShowAllTags();
    }
    function addGameToSavedPagesCustomEventHandler(){
        props.model.addGameToSavedPages();
    }
    function removeGameToSavedPagesCustomEventHandler(game){
        props.model.removeFromSavedPages(game);
    }
    function toggleYodafyDescriptionCutomEventHandler(){
        props.model.toggleYodafyValue();
    }
    function toggleShowCoverImageCustomEventHandler(){
        props.model.toggleShowCoverImage();
    }
    function loadScreenshotsCustomEventHandler(){
        props.model.loadScreenshotsForCurrentGame();
    }
    function toggleUpvoteGameCustomEventHandler(id){
        props.model.updateAllUpvotes(id);
    }
    function hasUserUpvotedGameCustomEventHandler(id){
        return props.model.hasUserUpvotedGame(id);
    }
    function loadYodafyDescriptionCustomEventHandler(){
        props.model.loadYodafyDescription();
    }
    function addCurrentPageToViewHistoryCustomEventHandler(){
        props.model.addCurrentPageToViewHistory();
    }
    return (
        <div>
            {showDetailsViewOrNot(props.model.currentPagePromiseState)}
        </div>
    );
    
}