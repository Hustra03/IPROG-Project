import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SearchResultView(props) {

    function backToMainMenuCB() {window.location.hash = "#/"; }
    function loadMoreGamesCB() {props.loadMoreGames();}
    return(
    <div className="searchResultsContainer">
        <span>{props.searchResult}</span>
        <CButton onClick={backToMainMenuCB} className="searchResultInitial">Main Menu</CButton>
        {props.searchResults.map(searchResultsMapCB)}
        <CButton onClick={loadMoreGamesCB} className="searchResultInitial">Load more games</CButton>
        <div className="hiddenText">hi</div>
    </div>
    )

    function searchResultsMapCB(game){
        function onSearchResultClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div onClick={onSearchResultClickCB} className="searchResult">
                <div class="SearchResultTitleAndInfo">
                    <div className="searchResultTitle">{game.name}</div>
                    <div className="searchResultRating">Rating: {game.rating}</div>
                    <span className="searchResultInfo">Released: {game.released}</span>
                </div>
                <img className="searchResultImage" src={game.background_image} width="150"></img>
            </div>
        )
    }


}

export {SearchResultView};
