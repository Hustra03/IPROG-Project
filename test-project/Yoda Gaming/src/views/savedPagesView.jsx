import "/src/style.css"
import { CForm, CFormInput, CButton, CFormSelect, CFormCheck } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SavedPagesView(props){

    function backToMainMenuCB() {window.location.hash = "#/"; }
    function backToSearchCB() {window.location.hash = "#/search"; }
    function clearSavedCB() {props.model.clearSavedPages()}

    if (props.loggedIn) {
        if (props.savedPages.length == 0) {
            return <div className="noSavedPagesContainer">
                        <div className="noSavedPages">
                        <div>No Pages Seem To Have Been Saved Yet {props.savedPages.length}</div>
                        {console.log(props.savedPages)}
                        <CButton onClick={backToMainMenuCB} className="noSavedPagesReturn">Main Menu</CButton>
                        <CButton onClick={backToSearchCB} className="noSavedPagesReturn">Find A New Favorite</CButton>
                        </div>
                    </div>
        }

        return <div className="savedPagesContainer">
            {console.log("savedPages:" + props.savedPages)}
            amount of saved games: {props.savedPages.length}
            <button onClick={clearSavedCB}>clear saved pages</button>
        </div>
    }

    return <div>You must be logged in to save pages</div>

    function savedPagesMapCB(game){
        function onSavedPageClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div className="savedPagesImageAndTitle" onClick={onSavedPageClickCB}>
                <div className="savedPagesImage">
                     here is saved games
                </div>
            </div>
        )
    }
}

export {SavedPagesView};