import PageDetailsView from '../views/pageDetailsView.jsx';
import {getCurrentGameUpvotes} from '../utilities.js';
        //file mainly worked on by Viktor Fredlund

export default
function Details(props) {
    
    function showDetailsViewOrNot(currentPagePromiseState){
        if(!currentPagePromiseState.promise){
            console.log("no data")
            return(
                <div>
                <p>no data</p>
                </div>
            )
        }
        if(!currentPagePromiseState.data && !currentPagePromiseState.error){
            console.log("loading")
            return(
                <div>
                    <img src="https://brfenergi.se/iprog/loading.gif"></img>
                </div>
            )
        }
        if(!currentPagePromiseState.data && currentPagePromiseState.error){
            console.log("oopsie")
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
    return (
        <div>
            {showDetailsViewOrNot(props.model.currentPagePromiseState)}
        </div>
    );
    
}