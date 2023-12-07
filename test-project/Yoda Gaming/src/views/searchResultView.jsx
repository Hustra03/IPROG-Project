import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

function SearchResultView(props) {

    function backToSavedPagesCB() {window.location.hash = "#/"; }
    return(
    <div className="searchResults">
        {props.searchResults.map(searchResultsMapCB)}
        <CButton onClick={backToSavedPagesCB} >back to initial</CButton>
    </div>
    )

    function searchResultsMapCB(game){
        function onSearchResultClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div onClick={onSearchResultClickCB} className="searchResult" style="background-color:">
                <span className="searchResultInfo">{game.name}</span>
                <img classname="searchResultImage" src={game.background_image} width="150"></img>
            </div>
        )
    }


}

export {SearchResultView};
