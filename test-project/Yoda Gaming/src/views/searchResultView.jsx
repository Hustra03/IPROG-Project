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
            <a href='https://rawg.io/apidocs'>Data from RAWG Api</a>
            <div className="searchResultsFooter">
                {loadMoreButton()}
            </div>
        </div>
    </div>
    )

    function loadMoreButton(){
        if (props.pages < 40){
            return <CButton onClick={loadMoreGamesCB} className="searchResultLoadMoreButton">Load More Games</CButton>
        }
        return <div className="searchResultLoadMoreButtonDeactive">No More Games To Load, Search With More Detail If You Did Not Find What You Were Looking For.</div>
    }

    function searchResultsMapCB(game){
        function onSearchResultClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div onClick={onSearchResultClickCB} className="searchResult">
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
