import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SearchResultView(props) {

    function backToMainMenuCB() {window.location.hash = "#/"; }
    return(
    <div className="searchResults">
        <span>{props.searchResult}</span>
        <CButton onClick={backToMainMenuCB} className="searchResultInitial">Main Menu</CButton>
        {props.searchResults.map(searchResultsMapCB)}
        <CButton onClick={backToMainMenuCB} className="searchResultInitial">Main Menu</CButton>
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
                <div class="titleAndInfo">
                    <div className="searchResultTitle">{game.name}</div>
                    <div className="searchResultRating">{game.rating}</div>
                    <span className="searchResultInfo">Here goes some game descrition, consectetur adipiscing elit. Nullam tincidunt pharetra nibh ut egestas.</span>
                </div>
                <img className="searchResultImage" src={game.background_image} width="150"></img>
            </div>
        )
    }


}

export {SearchResultView};
