import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SearchResultView(props) {

    function loadMoreGamesCB() {props.loadMoreGames();}
    return(
    <div className="searchResultsOuterContainer">
        <div className="searchResultsContainer">
            <div className="searchResultsHeader">Search Results for "{props.search}"</div>
            <span>{props.searchResult}</span>
            {props.searchResults.map(searchResultsMapCB)}
            <div className="searchResultsFooter">
                <CButton onClick={loadMoreGamesCB} className="searchResultLoadMoreButton">Load more games</CButton>
            </div>
        </div>
    </div>
    )

    function searchResultsMapCB(game){
        function onSearchResultClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div className="searchResult">
                <img
                    onClick={onSearchResultClickCB}
                    className="searchResultImage" 
                    src={game.background_image} 
                    alt="game image"
                    >
                </img>
                <div class="SearchResultTitleAndInfo">
                    <div onClick={onSearchResultClickCB} className="searchResultTitle">{game.name}</div>
                    <div className="searchResultRating">Rating: {game.rating}</div>
                    <span className="searchResultInfo">Released: {game.released}</span>
                </div>
                
            </div>
        )
    }


}

export {SearchResultView};
