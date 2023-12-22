import { CButton, } from '@coreui/vue';

//file mainly worked on by Eliaz Biderstrand

function SavedPagesView(props){

    function backToMainMenuACB() {window.location.hash = "#/"; }
    function backToSearchACB() {window.location.hash = "#/search"; }
    function clearSavedPagesACB() {props.clearSavedPages();}
    function editSavedPagesACB() {props.toggleDeleteState();}

    if (props.loggedIn) {

        if (props.savedPages.length == 0) {
            return <div className="noSavedPagesContainer">
                    <div className="noSavedPages">
                        <div>Huh, It Seems That You Don't Have Any Games Saved Yet.</div>
                        <CButton onClick={backToMainMenuACB} className="noSavedPagesReturn">Find One In The Main Menu</CButton>
                        <div>Or</div>
                        <CButton onClick={backToSearchACB} className="noSavedPagesReturn">Search For One To Save</CButton>
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
                <a href='https://rawg.io/apidocs' className="savedPagesRAWG">Data from RAWG Api</a>
            </div>
        }

        else{
            return <div>this shouldn't happen
                <button onClick={clearSavedPagesACB}>clear saved pages</button>
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
                clearSavedPagesACB();
            }
        }
    
        if (props.inDeleteState === false) {
            return;
        }
        return (
            <CButton onClick={handleRemoveAll} className="savedPagesRemoveAllButton">Remove all</CButton>
        
        );
    }

    function generateEditButton(){
        if (props.inDeleteState === false){
            return <CButton onClick={editSavedPagesACB} className="savedPagesEditButton">Edit</CButton>
        }
        return <CButton onClick={editSavedPagesACB} className="savedPagesEditButton">Done</CButton>
    }

    function savedPagesMapCB(game){
        function onSavedPageClickACB(){
            props.chosenGame(game);
            window.location.hash = "#/details"
        }

        function onRemoveGameClickACB() {
            props.removeGame(game);
        }

        function generateRemoveButton(){
            if (props.inDeleteState == false){
                return
            }
            return <div><CButton className="savedPagesRemoveButton" onClick={onRemoveGameClickACB}>X</CButton></div>
        }

        return (
            <div className="savedPagesImageAndTitleContainer">
                <div className="savedPagesImageContainer">
                    <img
                        className="savedPagesImage"
                        src={game.image}
                        onClick={onSavedPageClickACB}
                        alt="game image"
                    />
                </div>
                {generateRemoveButton()}
                    <div className="savedPagesTitleContainer">
                        <h3 onClick={onSavedPageClickACB} className="savedPagesGameTitle">{game.name}</h3>
                    </div>
            </div>
        )
    }
}

export {SavedPagesView};