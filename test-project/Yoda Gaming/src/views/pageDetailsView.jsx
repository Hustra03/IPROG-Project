import {CButton} from '@coreui/vue';
import "/src/style.css"

function PageDetailsView(props) {
    function backToSearchResultPageCB() {
        window.location.hash = "#/searchResult";
    }
    const firstFiveTags = props.gameDetails.tags.slice(0, 5);
    const moreTags = props.gameDetails.tags.length > 5;
    let tagsToDisplay = firstFiveTags;
    function changeTagsToDisplayCB() {
        if (tagsToDisplay === firstFiveTags)
            tagsToDisplay = props.gameDetails.tags;
        else
            tagsToDisplay = firstFiveTags
    }
    return (
        <div className="gameDetails">

            <CButton onClick={backToSearchResultPageCB} className="backButton">Back to search results</CButton>
            <div className="detailsTopInfo">
                <h3 className="detailsPageName">Details Page</h3>
                <h4 className="gameDetailsMetacritic"> Metacritic score: {props.gameDetails.metacritic}/100</h4>
                <h4 className="gameDetailsReleased">Released: {props.gameDetails.released}</h4>
            </div>
           
            <h1 className="gameDetailsTitle">{props.gameDetails.name}</h1>
            <span className="gameDetailsImages"><img src={props.gameDetails.background_image} alt="game image" /><img src={props.gameDetails.background_image_additional} /></span>
            <div>
                <h2 className="gameDetailsDescriptionTitle">Description</h2>
                <p className="gameDetailsDescription">{props.gameDetails.description_raw}</p>
            </div>
            <tbody className="tags">
                <h3 className="gameDetailsTagsTitle">Tags</h3>
                {(tagsToDisplay).map(displayTagsCB)}
                {moreTags ? <CButton onClick={changeTagsToDisplayCB} className="tagsButton">Show more tags</CButton> : null}
            </tbody>
            <tbody className="genres">
                <h3 className="gameDetailsGenresTitle">Genres</h3>
                {(props.gameDetails.genres).map(displayGenresCB)}
            </tbody>
        </div>
    )
    
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