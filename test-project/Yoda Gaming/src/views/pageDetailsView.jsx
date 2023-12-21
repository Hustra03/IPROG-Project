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
    function loadYodafyDescriptionACB(){
        props.loadYodafyDescriptionCustomEvent();
    }
    return (
        <div className="gameDetails">

            <div className="gameDetailsHeader">
                <div className="gameDetailsHeaderTitle">
                    <CButton onClick={backToSearchResultPageCB} component="a" color="success" size="lg">Back to search results</CButton>
                    <h2 className="detailsPageName">Details Page</h2>
                    <h1 className="detailsGameTitle">{props.gameDetails.name ? props.gameDetails.name : "Game name missing"}</h1>
                </div>
                <div className="detailsButtonPair">
                    {showUpvoteGameButton()}
                    {showAddToSavedPagesButton()}
                </div>
            </div>
            <div className="gameDetailsImages">
                {imageToDisplay()}
                {imageButtonToShow()}
            </div>
            <div className="detailsInfoBox">
                <div className="leftInfo">
                    {props.gameDetails.publishers[0] ? <h4 className="infoBoxTitles">Publisher: {props.gameDetails.publishers[0].name}</h4> : null}
                    {props.gameDetails.developers[0] ? <h4 className="infoBoxTitles">Developer: {props.gameDetails.developers[0].name}</h4> : null}
                </div>
                <div className="middleInfo">
                    {props.gameDetails.released ? <h4 className="infoBoxTitles">Released: {props.gameDetails.released}</h4> : null}
                    {props.gameDetails.playtime ? <h4 className="infoBoxTitles">Playtime: {props.gameDetails.playtime} hours</h4> : null}
                    {props.gameDetails.rating ? <h4 className="infoBoxTitles">Rating: {ratingToYodas(props.gameDetails.rating)} /5</h4> : null}
                </div>
                <div className="rightInfo">
                    {props.gameDetails.metacritic ? <h4 className="infoBoxTitles"> Metacritic Score: {props.gameDetails.metacritic}/100</h4> : null}
                    {props.gameDetails.esrb_rating ? <h4 className="infoBoxTitles">Age Rating: {props.gameDetails.esrb_rating.name}</h4> : null}
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
                <CButton onClick={toggleUpvoteGameCB} type="submit" color="success" style={{ margin: '10px' }} >{hasUserUpvotedGameCB() ? "Remove upvote | Upvotes: " + props.totalUpvotesForCurrentGame :  "Upvote game | Upvotes: " + props.totalUpvotesForCurrentGame}</CButton>
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
                    <img src={gameScreenshots.image} className="detailsImages"/>
                </CCarouselItem>
        )
    }
    function imageToDisplay(){
        console.log(props.showCoverImage)
        if (props.gameScreenshots && !props.showCoverImage){
            return (
            <CCarousel controls indicators>
                {(props.gameScreenshots).map(displayScreenshotsCB)}
            </CCarousel>
            )
        }
        else
            return <img src={props.gameDetails.background_image} className="detailsImages"/>
        }
    function imageButtonToShow(){
        if (!props.gameScreenshots){
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={loadScreenshotsACB} >Load and Show Screenshots</CButton> //Inline css because giving it a class overrites the styling of the thirdParty component
        }
        if(props.showCoverImage)
            return <CButton type="submit" color="success"  style={{ margin: '10px' }} onClick={toggleShowCoverImageCB} >Show Screenshots</CButton>
        else
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={toggleShowCoverImageCB} >Show Cover Image</CButton>

    }
    function descriptionButtonToShow(){
        if(!props.yodafiedDescriptionText)
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={loadYodafyDescriptionACB} >Yodafy translate description text</CButton>
        if(props.yodafy)
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={toggleYodafyDescriptionCB} >Show original description text</CButton>
        else
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={toggleYodafyDescriptionCB} >Show Yodafied description text</CButton>
    }
    function descriptionTextToShow(){
        if(!props.yodafy || !props.yodafiedDescriptionText)
            return <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>
        else
            return <p className="gameDetailsDescription">{props.yodafiedDescriptionText}</p>
            
    }
    function ratingToYodas(rating){ //Function that takes a rating between 1-5 and returns a number of yodas based on the rating
        const fullYodas = Math.floor(rating);
        const halfYoda = rating - fullYodas;
        let yodasToReturn = [];
        for (let i = 0; i < fullYodas; i++)
            yodasToReturn.push(<img src="https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png" alt="Yoda Icon"/>);
        if (halfYoda) {
            yodasToReturn.push(
                <div className="halfYoda" style={{ width: `${28 * halfYoda + 4}px`}}> 
                    <img src="https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png" alt="Fraction of Yoda Icon"/> 
                </div> //Inline css because it needs to perform math uisng a variable to calculate the value for the width
            );        
        }
        return yodasToReturn
    }
}

export default PageDetailsView