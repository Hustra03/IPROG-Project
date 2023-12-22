import {SavedPagesView} from "../views/savedPagesView";

//file mainly worked on by Eliaz Biderstrand

export default
    function SavedPagesPresenter(props) {
    return (
        <div>
            <SavedPagesView
                savedPages={props.model.savedPages}
                loggedIn={props.model.user}
                inDeleteState={props.model.deleteState}
                clearSavedPages={clearSavedPagesCustomEventHandlerACB}
                chosenGame={chosenGameCustomEventHandlerACB}
                toggleDeleteState={toggleDeleteStateCustomEventHandlerACB}
                removeGame={removeGameCustomEventHandlerACB}
            />
        </div>
    );

    function clearSavedPagesCustomEventHandlerACB() {
        props.model.clearSavedPages();
        props.model.setDeleteStateFalse();
    }

    function chosenGameCustomEventHandlerACB(game){
        props.model.setPage(game.id)
        props.model.setDeleteStateFalse();
    }

    function toggleDeleteStateCustomEventHandlerACB(){
        props.model.toggleDeleteState();
    }

    function removeGameCustomEventHandlerACB(game){
        props.model.removeFromSavedPages(game);
    }

}