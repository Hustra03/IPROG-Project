import { CButton, } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SavedPagesView(props){

    function backToMainMenuCB() {window.location.hash = "#/"; }
    function backToSearchCB() {window.location.hash = "#/search"; }
    function clearSavedPagesCB() {props.clearSavedPages();}
    function editSavedPagesCB() {props.toggleDeleteState();}

    if (props.loggedIn) {

        if (props.savedPages.length == 0) {
            return <div className="noSavedPagesContainer">
                        <div className="noSavedPages">
                            <div>Huh, It Seems That You Don't Have Any Games Saved Yet.</div>
                            <CButton onClick={backToMainMenuCB} className="noSavedPagesReturn">Find One In The Main Menu</CButton>
                            <div>Or</div>
                            <CButton onClick={backToSearchCB} className="noSavedPagesReturn">Search For One To Save</CButton>
                        </div>
                    </div>
        }

        if (props.savedPages.length>0){

                return <div className="savedPagesContainer">
                    <div className="savedPagesHeader">
                        <div className="savedPagesIntro">Your Saved Games</div>
                        <div className="savedPagesHeaderButtons">
                            {generateEditButton()}
                            {generateRemoveAllGamesButton()}
                        </div>
                    </div>
                    <div className="savedPagesGameContainer">
                        {props.savedPages.map(savedPagesMapCB)}
                    </div>
                </div>
            }

            else{return <div>this shouldn't happen
                <button onClick={clearSavedPagesCB}>clear saved pages</button>
                {console.log("saved pages is an array? " + Array.isArray(props.savedPages) + " length of savedPages= ")}
                {console.log(props.savedPages.length)}
            </div>
        }
    }

    return <div className="noSavedPagesContainer">
                <div className="noSavedPages">
                    <div>Please Login In Order To See Your Saved Games.</div>
                </div>
            </div>

    function generateRemoveAllGamesButton() {
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

    function generateEditButton(){
        if (props.deleteState === false){
            return <CButton onClick={editSavedPagesCB} className="savedPagesEditButton">Edit</CButton>
        }
        return <CButton onClick={editSavedPagesCB} className="savedPagesEditButton">Done</CButton>
    }

    function savedPagesMapCB(game){
        function onSavedPageClickCB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        function onRemoveGameClickCB() {
            props.removeGame(game);
        }

        function generateRemoveButton(){
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
                        alt="game image"
                    />
                </div>
                {generateRemoveButton()}
                    <div className="savedPagesTitleContainer">
                            <t onClick={onSavedPageClickCB} className="savedPagesGameTitle">{game.name}</t>
                    </div>
            </div>
        )
    }
}

export {SavedPagesView};