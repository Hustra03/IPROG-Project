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
                clearSavedPages={clearSavedPagesCustomEventHandler}
                chosenGame={chosenGameCustomEventHandler}
                toggleDeleteState={toggleDeleteStateCustomEventHandler}
                removeGame={removeGameCustomEventHandler}
            />
        </div>
    );

    function clearSavedPagesCustomEventHandler() {
        props.model.clearSavedPages();
        props.model.setDeleteStateFalse();
    }

    function chosenGameCustomEventHandler(game){
        props.model.setPage(game.id)
        props.model.setDeleteStateFalse();
    }

    function toggleDeleteStateCustomEventHandler(){
        props.model.toggleDeleteState();
    }

    function removeGameCustomEventHandler(game){
        props.model.removeFromSavedPages(game);
    }

}