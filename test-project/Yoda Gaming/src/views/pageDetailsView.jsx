import {CButton, CCarousel, CCarouselItem} from '@coreui/vue';

import "/src/style.css"
    //file mainly worked on by Viktor Fredlund
    //

function PageDetailsView(props) {
    function backToSearchResultPageCB() {
        window.location.hash = "#/searchResult";
    }
    const firstFiveTags = props.gameDetails.tags.slice(0, 5);
    const moreTags = props.gameDetails.tags.length > 5;
    function changeTagsToDisplayCB() {
        props.showAllTagsCustomEvent();
    }
    function addGameToSavedPagesCB(){
        props.addGameToSavedPagesCustomEvent();
    }
    function showScreenshotsCB(){
        props.showScreenshotsCustomEvent();
    }
    function showCoverImageCB(){
        props.showCoverImageCustomEvent();
    }
    function yodafyDescriptionCB(){
        props.yodafyDescriptionCustomEvent();
    }
    return (
        <div className="gameDetails">

            <CButton onClick={backToSearchResultPageCB} className="backButton, detailsButton">Back to search results</CButton>
            <h2 className="detailsPageName, detailsText">Details Page</h2>
            <div className="detailsTopInfo">
                <div className="leftInfo">
                    {props.gameDetails.publishers ? <h4 className="gameDetailsPublisher">Publisher: {props.gameDetails.publishers[0].name}</h4> : null}
                    {props.gameDetails.developers ? <h4 className="gameDetailsDeveloper">Developer: {props.gameDetails.developers[0].name}</h4> : null}
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
           
            <h1 className="gameDetailsTitle, detailsText">{props.gameDetails.name}</h1>
            <div className="belowTopInfo">
                <div className="gameDetailsImages">
                
                
                {imageToDisplay()}
                {imageButtonToShow()}
                {showAddToSavedPagesButton()}
                <CButton onClick={yodafyDescriptionCB} className="detailsButton">Yodafy description text</CButton>
                </div>
                <div className="infoBesideImage">
                    <tbody className="tags">
                        <h3 className="gameDetailsTagsTitle">Tags</h3>
                        {tagsToShow()}
                    </tbody>
                    <tbody className="genres">
                        <h3 className="gameDetailsGenresTitle">Genres</h3>
                        {(props.gameDetails.genres).map(displayGenresCB)}
                    </tbody>
                </div>
            </div>
            <div>
                <h2 className="gameDetailsDescriptionTitle">Description</h2>
                {props.yodafiedDescriptionText ? <p className="gameDetailsDescription">{props.yodafiedDescriptionText}</p> : 
                <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>}
            </div>
            

        </div>
    )
    function tagsToShow(){
        if (!props.showAllTags){
            return (
                <div>
                    {(firstFiveTags).map(displayTagsCB)}
                    {moreTags ? <CButton onClick={changeTagsToDisplayCB} className="tagsButton, detailsButton">Show more tags</CButton> : null}
                </div>
            )
        }
        return (
            <div>
                {(props.gameDetails.tags).map(displayTagsCB)}
                {moreTags ? <CButton onClick={changeTagsToDisplayCB} className="tagsButton, detailsButton">Show less tags</CButton> : null}
            </div>
            

        )

    }
    function showAddToSavedPagesButton(){
        if(props.loggedIn){
            function isGameInSavedPagesCB(game){
                return game.id === props.gameDetails.id;
            }
            return(
                <CButton onClick={addGameToSavedPagesCB} disabled={props.savedPages.some(isGameInSavedPagesCB)} className="favoriteButton, detailsButton">Add this game to your saved pages</CButton>
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
            <CCarousel controls indicators>
                {(props.gameScreenshots).map(displayScreenshotsCB)}
            </CCarousel>
            )
        }
        else
            return <img src={props.gameDetails.background_image} class="detailsImages"/>
        }
    function imageButtonToShow(){
        if (!props.gameScreenshots || props.showCoverImage){
            return <CButton onClick={showScreenshotsCB} className="detailsButton">Show Screenshots</CButton>
        }
        else
            return <CButton onClick={showCoverImageCB} className="detailsButton">Show Cover Image</CButton>

    }
}

export default PageDetailsView