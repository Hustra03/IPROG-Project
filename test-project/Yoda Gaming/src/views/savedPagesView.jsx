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
                        <div>No Pages Seem To Have Been Saved Yet</div>
                        {console.log(props.savedPages)}
                        <CButton onClick={backToMainMenuCB} className="noSavedPagesReturn">Main Menu</CButton>
                        <CButton onClick={backToSearchCB} className="noSavedPagesReturn">Find A New Favorite</CButton>
                        </div>
                    </div>
        }

        if (props.savedPages.length>0){

            return <div className="savedPagesContainer">
                {/* {console.log("savedPages:" + props.savedPages)}
                {console.log("saved pages is an array? " + Array.isArray(props.savedPages))} */}
                <div className="savedPagesHeader">
                    <div className="savedPagesIntro">Your saved games</div>
                    <CButton className="savedPagesClear" onClick={clearSavedCB}>clear saved pages</CButton>
                </div>
                <div className="savedPagesGameContainer">
                    {props.savedPages.map(savedPagesMapCB)}
                </div>
                
            </div>
        }

        else{return <div>this shouldn't happen
            <button onClick={clearSavedCB}>clear saved pages</button>
            {console.log("saved pages is an array? " + Array.isArray(props.savedPages) + " length of savedPages= ")}
            {console.log(props.savedPages.length)}
        </div>
    }
    }

    return <div>You must be logged in to save pages</div>

    function savedPagesMapCB(game){
        function onSavedPageClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        return (
            <div className="savedPagesImageAndTitle">
            <img
                className="savedPagesImage"
                src={game.image}
                width="130"
                onClick={onSavedPageClickCB}
            />
            <div className="savedPagesTitle" onClick={onSavedPageClickCB}>
                {game.name}
            </div>
        </div>
        )
    }
}

export {SavedPagesView};