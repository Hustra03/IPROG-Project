import {CButton, CCarousel, CCarouselItem} from '@coreui/vue';

import "/src/style.css"
    //file mainly worked on by Viktor Fredlund
    //

function PageDetailsView(props) {
    function backToSearchResultPageCB() {
        window.location.hash = "#/searchResult";
    }
    const firstFiveTags = props.gameDetails.tags.slice(0, 9);
    const moreTags = props.gameDetails.tags.length > 9;
    function changeTagsToDisplayCB() {
        props.showAllTagsCustomEvent();
    }
    function addGameToSavedPagesCB(){
        props.addGameToSavedPagesCustomEvent();
    }
    function toggleShowCoverImageCB(){
        props.toggleShowCoverImageCustomEvent();
    }
    function loadScreenshotsACB(){
        props.loadScreenshotsCustomEvent();
    }
    function toggleYodafyDescriptionCB(){
        props.toggleYodafyDescriptionCustomEvent();
    }
    function toggleUpvoteGameCB(){
        props.toggleUpvoteGameCustomEvent(props.gameDetails.id);
    }
    function hasUserUpvotedGameCB(){
        return props.hasUserUpvotedGameCustomEvent(props.gameDetails.id)
    }
    
    return (
        <div className="gameDetails">

            <div className="gameDetailsHeader">
                <div className="gameDetailsHeaderTitle">
                    <CButton onClick={backToSearchResultPageCB} component="a" color="success" size="lg">Back to search results</CButton>
                    <h2 className="detailsPageName detailsText">Details Page</h2>
                    <h1 className="gameDetailsTitle detailsText">{props.gameDetails.name ? props.gameDetails.name : "Game name missing"}</h1>
                </div>
                <div className="detailsButtonPair">
                    <h4 className="gameDetailsTotalUpvotes">Total upvotes: {props.totalUpvotesForCurrentGame}</h4>
                    {showUpvoteGameButton()}
                    {showAddToSavedPagesButton()}
                </div>
            </div>
            <div className="gameDetailsImages">
                {imageToDisplay()}
                {imageButtonToShow()}
            </div>
            <div className="detailsTopInfo">
                <div className="leftInfo">
                    {props.gameDetails.publishers[0] ? <h4 className="gameDetailsPublisher">Publisher: {props.gameDetails.publishers[0].name}</h4> : null}
                    {props.gameDetails.developers[0] ? <h4 className="gameDetailsDeveloper">Developer: {props.gameDetails.developers[0].name}</h4> : null}
                </div>
                <div className="middleInfo">
                    {props.gameDetails.released ? <h4 className="gameDetailsReleased">Released: {props.gameDetails.released}</h4> : null}
                    {props.gameDetails.playtime ? <h4 className="gameDetailsPlaytime">Playtime: {props.gameDetails.playtime} hours</h4> : null}
                </div>
                <div className="rightInfo">
                    {props.gameDetails.metacritic ? <h4 className="gameDetailsMetacritic"> Metacritic Score: {props.gameDetails.metacritic}/100</h4> : null}
                    {props.gameDetails.rating ? <h4 className="gameDetailsRating">Rating: {props.gameDetails.rating}/5</h4> : null}
                    {props.gameDetails.esrb_rating ? <h4 className="gameDetailsMatureRating">Age Rating: {props.gameDetails.esrb_rating.name}</h4> : null}
                </div>
            </div>
            <div className="detailsBottomInfo">
                <div className="desciptionBox">
                    <div className="gameDetailsDescriptionHeader">
                        <h2 className="gameDetailsDescriptionTitle">Description</h2>
                        {descriptionButtonToShow()}
                    </div>
                    {descriptionTextToShow()}
                </div>
                <div className="infoBesideDescription">
                    <tbody className="detailsInfoBoxes">
                        <h3 className="infoBoxTitle">Tags</h3>
                        {tagsToShow()}
                    </tbody>
                    <tbody className="detailsInfoBoxes">
                        <h3 className="infoBoxTitle">Genres</h3>
                        {(props.gameDetails.genres).map(displayGenresCB)}
                    </tbody>
                </div>
                <div className="infoBesideDescription">
                    <tbody className="detailsInfoBoxes">
                        <h3 className="infoBoxTitle">Platforms</h3>
                        {(props.gameDetails.platforms).map(displayPlatformsCB)}
                    </tbody>
                    <tbody className="detailsInfoBoxes">
                        <h3 className="infoBoxTitle">Stores</h3>
                        {(props.gameDetails.stores).map(displayStoresCB)}
                    </tbody>
                </div>
                
                
            </div>
            

        </div>
    )
    function tagsToShow(){
        if (!props.showAllTags){
            return (
                <div>
                    {(firstFiveTags).map(displayTagsCB)}
                    {moreTags ? <CButton onClick={changeTagsToDisplayCB} type="submit" color="dark" size="sm">Show more tags</CButton> : null}
                </div>
            )
        }
        return (
            <div>
                {(props.gameDetails.tags).map(displayTagsCB)}
                {moreTags ? <CButton onClick={changeTagsToDisplayCB} type="submit" color="dark" size="sm">Show less tags</CButton> : null}
            </div>
            

        )

    }
    function showAddToSavedPagesButton(){
        if(props.loggedIn){
            function isGameInSavedPagesCB(game){
                return game.id === props.gameDetails.id;
            }
            return(
                <CButton onClick={addGameToSavedPagesCB} type="submit" color="success" style={{ margin: '10px' }} disabled={props.savedPages.some(isGameInSavedPagesCB)  } >Add this game to your saved pages</CButton>
            )
        }
    }
    function showUpvoteGameButton(){
        if(props.loggedIn){
            return(
                <CButton onClick={toggleUpvoteGameCB} type="submit" color="success" style={{ margin: '10px' }} >{hasUserUpvotedGameCB() ? "Remove upvote" :  "Upvote game"}</CButton>
            )
        }
    }
    function displayTagsCB(tags){
        return( 
                <tr> {tags.name} </tr>
        )
    }
    function displayGenresCB(genres){
        return(
            <tr> {genres.name} </tr>
        )
    }
    function displayPlatformsCB(platforms){
        return(
            <tr> {platforms.platform.name} </tr>
        )
    }
    function displayStoresCB(stores){
        return(
            <tr> {stores.store.name} </tr>
        )
    }
    function displayScreenshotsCB(gameScreenshots){
        return (
                <CCarouselItem>
                    <img src={gameScreenshots.image} class="detailsImages"/>
                </CCarouselItem>
        )
    }
    function imageToDisplay(){
        console.log(props.showCoverImage)
        if (props.gameScreenshots && !props.showCoverImage){
            return (
            <CCarousel controls indicators class="detailsImages">
                {(props.gameScreenshots).map(displayScreenshotsCB)}
            </CCarousel>
            )
        }
        else
            return <img src={props.gameDetails.background_image} class="detailsImages"/>
        }
    function imageButtonToShow(){
        if (!props.gameScreenshots){
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={loadScreenshotsACB} >Show Screenshots</CButton>
        }
        if(props.showCoverImage)
            return <CButton type="submit" color="success"  style={{ margin: '10px' }} onClick={toggleShowCoverImageCB} >Show Screenshots</CButton>
        else
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={toggleShowCoverImageCB} >Show Cover Image</CButton>

    }
    function descriptionButtonToShow(){
        if(!props.yodafy || !props.yodafiedDescriptionText)
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={toggleYodafyDescriptionCB} >Yodafy description text</CButton>
        else
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={toggleYodafyDescriptionCB} >Unyodafy description text</CButton>
    }
    function descriptionTextToShow(){
        if(!props.yodafy || !props.yodafiedDescriptionText)
            return <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>
        else
            return <p className="gameDetailsDescription">{props.yodafiedDescriptionText}</p>
            
    }
}

export default PageDetailsView