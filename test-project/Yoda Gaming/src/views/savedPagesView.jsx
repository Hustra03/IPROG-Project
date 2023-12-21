import "/src/style.css"
import { CButton, } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SavedPagesView(props){

    function backToMainMenuCB() {window.location.hash = "#/"; }
    function backToSearchCB() {window.location.hash = "#/search"; }
    function clearSavedCB() {props.clearSavedPages();}
    function editSavedGamesCB() {props.toggleDeleteState();}

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
                        <div className="savedPagesIntro">Your Saved Games</div>
                        <div className="savedPagesHeaderButtons">
                            {editButton()}
                            {removeAllGamesButton()}
                        </div>
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

    function removeAllGamesButton() {
        function handleRemoveAll() {
            
            const confirmed = window.confirm("Are you sure you want to remove all saved games? This cannot be undone.");
            if (confirmed) {
                clearSavedCB();
            }
        }
    
        if (props.deleteState === false) {
            return;
        }
        return (
            <CButton onClick={handleRemoveAll} className="savedPagesRemoveAllButton">Remove all</CButton>
        
        );
    }

    function editButton(){
        if (props.deleteState === false){
            return <CButton onClick={editSavedGamesCB} className="savedPagesEditButton">Edit</CButton>
        }
        return <CButton onClick={editSavedGamesCB} className="savedPagesEditButton">Done</CButton>
    }

    function savedPagesMapCB(game){
        function onSavedPageClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        function onRemoveGameClickCB() {
            props.removeGame(game);
        }

        function removeButton(){
            if (props.deleteState == false){
                return
            }
            return <div><CButton className="savedPagesRemoveButton" onClick={onRemoveGameClickCB}>X</CButton></div>
        }

        return (
            <div className="savedPagesImageAndTitleContainer">
                <div className="savedPagesImageContainer">
                    <img
                        className="savedPagesImage"
                        src={game.image}
                        onClick={onSavedPageClickCB}
                    />
                </div>
                {removeButton()}
                    <div className="savedPagesTitleContainer">
                            <t onClick={onSavedPageClickCB} className="savedPagesGameTitle">{game.name}</t>
                    </div>
            </div>
        )
    }
}

export {SavedPagesView};