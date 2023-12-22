import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";



export default
    function HeaderPresenter(props) {

    function loginCustomEventHandlerACB() {
        if (!auth.currentUser) {
            props.model.setLoggingIn(true);
            signInWithPopup(auth, provider);
        }
    }

    function signOutCustomEventHandlerACB() {
        if (auth.currentUser) {
            props.model.signOut();
            signOut(auth);
        }
    }

    return (

        <HeaderView
            query={props.model.searchParams.query}
            loggedIn={props.model.user}
            loggingIn={props.model.loggingIn}
            alertBody={props.model.alertBody}
            alertVisability={props.model.alertVisability}
            searchResultsData={props.model.searchResultsPromiseState.data}
            currentLocation={props.model.currentLocation}
            loginCustomEventCB={loginCustomEventHandlerACB}
            signOutCustomEventCB={signOutCustomEventHandlerACB}
            searchCustomEventCB={onSearchButtonPressCustomEventHandlerACB}
            onQueryInputChangeCustomEventCB={onQueryInputChangeCustomEventHandlerACB}
            alertBodyChangeCustomEventCB={onAlertBodyChangeCustomEventHandlerACB}
            closeAlertCustomEventCB={closeAlertCustomEventHandlerACB}
            headerTitleClickedCustomEventCB={headerTitleClickedCustomEventHandlerACB}
            currentCat={props.model.currentCat} //current category used for homepage button disable functionality
            setDeleteStateFalseCustomEventCB={setDeleteStateFalseEventHandler}//used for saved pages to reset edit mode when entering savedPages
        />

    );

    function closeAlertCustomEventHandlerACB() { props.model.setAlertVisability(false); }

    function onAlertBodyChangeCustomEventHandlerACB(alertBody) {
        props.model.setAlertBody(alertBody);
        props.model.setAlertVisability(true);
    }
    function onQueryInputChangeCustomEventHandlerACB(query) {
        props.model.setSearchQuery(query);
    }
    function onSearchButtonPressCustomEventHandlerACB() {
        props.model.setCurrentCat(null); //so that you can return home after searching and seeing search results
        props.model.doSearch(true);
    }

    function headerTitleClickedCustomEventHandlerACB(){
        props.model.headerTitleClicked()//
    }

    function setDeleteStateFalseEventHandler(){
        props.model.setDeleteStateFalse();
    }
}