
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

function SearchResultView(props) {

    function backToSavedPagesCB() {window.location.hash = "#/savedPages"; }
    return(
    <div className="searchResults">
        {props.searchResults.map(searchResultsMapCB)}
        <CButton onClick={backToSavedPagesCB} type="submit">back to initial</CButton>
    </div>
    )

    function searchResultsMapCB(game){
        return (
            <span>
                <div>{game.name}</div>
            </span>
        )
    }


}

export {SearchResultView};