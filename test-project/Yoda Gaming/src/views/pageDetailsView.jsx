import {CButton} from '@coreui/vue';
import "/src/style.css"
    //file mainly worked on by Viktor Fredlund

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
    return (
        <div className="gameDetails">

            <CButton onClick={backToSearchResultPageCB} className="backButton">Back to search results</CButton>
            <h2 className="detailsPageName">Details Page</h2>
            <div className="detailsTopInfo">
                <div className="leftInfo">
                    <h4 className="gameDetailsPublisher">Publisher: {props.gameDetails.publishers ? props.gameDetails.publishers[0].name : "Publisher missing"}</h4>
                    <h4 className="gameDetailsDeveloper">Developer: {props.gameDetails.developers ? props.gameDetails.developers[0].name : "Developer missing"}</h4>
                </div>
                <div className="middleInfo">
                    <h4 className="gameDetailsReleased">Released: {props.gameDetails.released ? props.gameDetails.released : "Not relesed yet"}</h4>
                    <h4 className="gameDetailsPlaytime">Playtime: {props.gameDetails.playtime} hours</h4>
                </div>
                <div className="rightInfo">
                    <h4 className="gameDetailsMetacritic"> Metacritic Score: {props.gameDetails.metacritic ? props.gameDetails.metacritic : "Rating missing"}/100</h4>
                    <h4 className="gameDetailsRating">Rating: {props.gameDetails.rating ? props.gameDetails.rating : "Rating missing"}/5</h4>
                    <h4 className="gameDetailsMatureRating">Age Rating: {props.gameDetails.esrb_rating ? props.gameDetails.esrb_rating.name : "Rating missing"}</h4>
                </div>
            </div>
           
            <h1 className="gameDetailsTitle">{props.gameDetails.name}</h1>
            <span className="gameDetailsImages"><img src={props.gameDetails.background_image} alt="game image" /><img src={props.gameDetails.background_image_additional} /></span>
            <div>
                <h2 className="gameDetailsDescriptionTitle">Description</h2>
                <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>
            </div>
            <tbody className="tags">
                <h3 className="gameDetailsTagsTitle">Tags</h3>
                {tagsToShow()}
                
            </tbody>
            <tbody className="genres">
                <h3 className="gameDetailsGenresTitle">Genres</h3>
                {(props.gameDetails.genres).map(displayGenresCB)}
            </tbody>
            <CButton onClick={addGameToSavedPagesCB} className="favoriteButton">Add this game to your saved page</CButton>
        </div>
    )
    function tagsToShow(){
        if (!props.showAllTags){
            return (
                <div>
                    {(firstFiveTags).map(displayTagsCB)}
                    {moreTags ? <CButton onClick={changeTagsToDisplayCB} className="tagsButton">Show more tags</CButton> : null}
                </div>
            )
        }
        return (
            <div>
                {(props.gameDetails.tags).map(displayTagsCB)}
                {moreTags ? <CButton onClick={changeTagsToDisplayCB} className="tagsButton">Show less tags</CButton> : null}
            </div>
            

        )

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
}

export default PageDetailsView