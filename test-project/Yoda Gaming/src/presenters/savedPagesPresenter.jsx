import {SavedPagesView} from "../views/savedPagesView";

//file mainly worked on by Eliaz Biderstrand

export default
    function SavedPagesPresenter(props) {
    return (
        <div>
            <SavedPagesView
                savedPages={props.model.savedPages}
                loggedIn={props.model.user}
                alertBody={props.model.alertBody}
                alertVisability={props.model.alertVisability}
                clearSavedPages={clearSavedPagesCustomEventHandler}
                alertBodyChange={onAlertBodyChangeCustomEventHandler}
                closeAlert={closeAlertCustomEventHandler}
                chosenGame={chosenGameCustomEventHandler}
                removeGame={removeGameCustomEventHandler}
            />
        </div>
    );

    function clearSavedPagesCustomEventHandler() {

        props.model.clearSavedPages();
    }

    function chosenGameCustomEventHandler(game){
        props.model.setPage(game.id)
    }

    function removeGameCustomEventHandler(game){
        props.model.removeGameFromSavedPages(game);
    }

    function closeAlertCustomEventHandler() {
        props.model.setAlertVisability(false); 
    }

    function onAlertBodyChangeCustomEventHandler(alertBody) {
        props.model.setAlertBody(alertBody);
        props.model.setAlertVisability(true);
    }
}