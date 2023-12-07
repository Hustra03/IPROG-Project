import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';


function SavedPagesView(props){

    function backToMainMenuCB() {window.location.hash = "#/"; }
    function backToSearchCB() {window.location.hash = "#/search"; }


    if (props.savedPages.length == 0) {
        return <div className="centeredContainer">
                    <div className="noSavedPages">
                    <div>No Pages Seem To Have Been Saved Yet</div>
                    <CButton onClick={backToMainMenuCB} className="noSavedPagesReturn">Main Menu</CButton>
                    <CButton onClick={backToSearchCB} className="noSavedPagesReturn">Find A New Favorite</CButton>
                    </div>
                </div>
    }

    return <div className="savedPagesContainer">
        here the saved pages will appear later
    </div>
}

export {SavedPagesView};