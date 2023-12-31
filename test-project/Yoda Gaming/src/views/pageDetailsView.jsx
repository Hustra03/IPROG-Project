import {CButton, CCarousel, CCarouselItem} from '@coreui/vue';

import "/src/style.css"
    //file mainly worked on by Viktor Fredlund
    //

function PageDetailsView(props) {

    const firstFiveTags = props.gameDetails.tags.slice(0, 9);
    const moreTags = props.gameDetails.tags.length > 9;
    function clickedToggleTagsToDisplayHandlerACB() {
        props.toggleShowingTagsCustomEvent();
    }
    function clickedAddGameToSavedPagesHandlerACB(){
        props.addGameToSavedPagesCustomEvent();
    }
    function clickedRemoveGameToSavedPagesHandlerACB(){
        props.removeGameToSavedPagesCustomEvent(props.gameDetails);
    }
    function clickedToggleShowCoverImageHandlerACB(){
        props.toggleShowCoverImageCustomEvent();
    }
    function clickedLoadScreenshotsHandlerACB(){
        props.loadScreenshotsCustomEvent();
    }
    function clickedToggleYodafyDescriptionHandlerACB(){
        props.toggleYodafyDescriptionCustomEvent();
    }
    function clickedToggleUpvoteGameHandlerACB(){
        props.toggleUpvoteGameCustomEvent(props.gameDetails.id);
    }
    function hasUserUpvotedGameHandlerACB(){
        return props.hasUserUpvotedGameCustomEvent(props.gameDetails.id);
    }
    function clickedLoadYodafyDescriptionHandlerACB(){
        props.loadYodafyDescriptionCustomEvent();
    }
    function addCurrentPageToViewHistoryHandlerACB(){
        props.addCurrentPageToViewHistoryCustomEvent();
    }

    if(props.shouldViewHistoryUpdate){//Triggers once, when the user has clicked on a game 
        addCurrentPageToViewHistoryHandlerACB();
    }

    return (
        <div className="gameDetails">

            <div className="gameDetailsHeader">
                <div className="gameDetailsHeaderTitle">
                    <h2 className="detailsPageName">Details Page</h2>
                    <a className='rawgHyperLink' href='https://rawg.io/apidocs'>Data from RAWG Api</a>
                    <h1 className="detailsGameTitle">{props.gameDetails.name ? <strong>{props.gameDetails.name}</strong> : "Game name missing"}</h1>
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
                    {props.gameDetails.publishers[0] ? <h4 className="infoBoxTitles"><strong>Publisher: </strong>{props.gameDetails.publishers[0].name}</h4> : null}
                    {props.gameDetails.developers[0] ? <h4 className="infoBoxTitles"><strong>Developer: </strong>{props.gameDetails.developers[0].name}</h4> : null}
                </div>
                <div className="middleInfo">
                    {props.gameDetails.released ? <h4 className="infoBoxTitles"><strong>Released: </strong>{props.gameDetails.released}</h4> : null}
                    {props.gameDetails.playtime ? <h4 className="infoBoxTitles"><strong>Estimated Playtime: </strong>{props.gameDetails.playtime} hours</h4> : null}
                    {props.gameDetails.rating ? <h4 className="infoBoxTitles"><strong>Rating: </strong>{ratingToYodas(props.gameDetails.rating)} ({props.gameDetails.rating}) /5</h4> : null}
                </div>
                <div className="rightInfo">
                    {props.gameDetails.metacritic ? <h4 className="infoBoxTitles"><strong>Metacritic Score: </strong>{props.gameDetails.metacritic}/100</h4> : null}
                    {props.gameDetails.esrb_rating ? <h4 className="infoBoxTitles"><strong>Age Rating: </strong>{props.gameDetails.esrb_rating.name}</h4> : null}
                </div>
            </div>
            <div className="detailsBottomInfo">
                <div className="desciptionBox">
                    <div className="gameDetailsDescriptionHeader">
                        <h2 className="gameDetailsDescriptionTitle"><strong>Description</strong></h2>
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
                    {moreTags ? <CButton onClick={clickedToggleTagsToDisplayHandlerACB} type="submit" color="dark" size="sm">Show more tags</CButton> : null}
                </div>
            )
        }
        return (
            <div>
                {(props.gameDetails.tags).map(displayTagsCB)}
                {moreTags ? <CButton onClick={clickedToggleTagsToDisplayHandlerACB} type="submit" color="dark" size="sm">Show less tags</CButton> : null}
            </div>
            

        )

    }
    function showAddToSavedPagesButton(){
        if(props.loggedIn){
            function isGameInSavedPagesCB(game){
                return game.id === props.gameDetails.id;
            }
            if(props.savedPages.some(isGameInSavedPagesCB)){
                return(
                    <CButton onClick={clickedRemoveGameToSavedPagesHandlerACB} type="submit" color="danger" style={{ margin: '10px' }}>Remove this game from your saved pages</CButton>
                )
            }
            else
                return(
                    <CButton onClick={clickedAddGameToSavedPagesHandlerACB} type="submit" color="success" style={{ margin: '10px' }} >Add this game to your saved pages</CButton>
                )
        }
    }
    function showUpvoteGameButton(){
        if(props.loggedIn){
            return(
                <CButton onClick={clickedToggleUpvoteGameHandlerACB} type="submit" color="success" style={{ margin: '10px' }} >{hasUserUpvotedGameHandlerACB() ? "Remove upvote | Upvotes: " + props.totalUpvotesForCurrentGame :  "Upvote game | Upvotes: " + props.totalUpvotesForCurrentGame}</CButton>
            )
        }
    }
    function displayTagsCB(tags){
        return( 
                <tr key={tags.id}> {tags.name} </tr>
        )
    }
    function displayGenresCB(genres){
        return(
            <tr key={genres.id}> {genres.name} </tr>
        )
    }
    function displayPlatformsCB(platforms){
        return(
            <tr key={platforms.platform.id}> {platforms.platform.name} </tr>
        )
    }
    function displayStoresCB(stores){
        return(
            <tr key={stores.store.id}> {stores.store.name} </tr>
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
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={clickedLoadScreenshotsHandlerACB} >Load and Show Screenshots</CButton> //Inline css because giving it a class overrites the styling of the thirdParty component
        }
        if(props.showCoverImage)
            return <CButton type="submit" color="success"  style={{ margin: '10px' }} onClick={clickedToggleShowCoverImageHandlerACB} >Show Screenshots</CButton>
        else
            return <CButton type="submit" color="success" style={{ margin: '10px' }} onClick={clickedToggleShowCoverImageHandlerACB} >Show Cover Image</CButton>

    }
    function descriptionButtonToShow(){
        if(!props.yodafiedDescriptionText)
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={clickedLoadYodafyDescriptionHandlerACB} >Yodafy translate description text</CButton>
        if(props.yodafy)
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={clickedToggleYodafyDescriptionHandlerACB} >Show original description text</CButton>
        else
            return  <CButton type="submit" color="success" style={{ marginLeft: 'auto' }} onClick={clickedToggleYodafyDescriptionHandlerACB} >Show Yodafied description text</CButton>
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
                <div className="halfYoda" style={{ width: `${25 * halfYoda + 2}px`}}> 
                    <img src="https://www.shareicon.net/data/32x32/2015/07/18/71338_user_32x32.png" alt="Fraction of Yoda Icon"/> 
                </div> //Inline css because it needs to perform math uisng a variable to calculate the value for the width
            );        
        }
        return yodasToReturn
    }
}

export default PageDetailsView