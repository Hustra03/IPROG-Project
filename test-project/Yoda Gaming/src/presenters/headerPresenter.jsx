import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";



export default
    function HeaderPresenter(props) {

    function loginCustomEventHandler() {
        if (!auth.currentUser) {
            props.model.setLoggingIn(true);
            signInWithPopup(auth, provider).then(props.model.setCurrentUser(auth.currentUser));
        }
    }

    function signOutCustomEventHandler() {
        if (auth.currentUser) {
            props.model.signOut();
            signOut(auth);
            props.model.setLoggingIn(false);
        }
    }

    function yodafyCustomEventHandler() {
        props.model.toggleYodafyValue();
    }

    return (

        <HeaderView
            query={props.model.searchParams.query}
            yodafy={props.model.yodafy}
            loggedIn={props.model.user}
            loggingIn={props.model.loggingIn}
            alertBody={props.model.alertBody}
            alertVisability={props.model.alertVisability}
            searchResultsData={props.model.searchResultsPromiseState.data}
            currentLocation={props.model.currentLocation}
            loginCustomEvent={loginCustomEventHandler}
            signOutCustomEvent={signOutCustomEventHandler}
            yodafyCustomEvent={yodafyCustomEventHandler}
            searchCustomEvent={onSearchButtonPressCustomEventHandler}
            onQueryInputChange={onQueryInputChangeCustomEventHandler}
            alertBodyChange={onAlertBodyChangeCustomEventHandler}
            closeAlert={closeAlertCustomEventHandler}
            headerTitleClicked={headerTitleClickedCustomEventHandler}
            currentCat={props.model.currentCat} //current category used for homepage button disable functionality
        />

    );

    function closeAlertCustomEventHandler() { props.model.setAlertVisability(false); }

    function onAlertBodyChangeCustomEventHandler(alertBody) {
        props.model.setAlertBody(alertBody);
        props.model.setAlertVisability(true);
    }
    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }
    function onSearchButtonPressCustomEventHandler() {
        props.model.setCurrentCat(null); //so that you can return home after searching and seeing search results
        props.model.doSearch(true);
    }

    function headerTitleClickedCustomEventHandler(){
        props.model.setCurrentCat(0);//to disable title click to prevent unnecessary searches
        props.model.setSearchQuery(null); //reset previous search params
        props.model.setSearchMinMetacritic(50);
        props.model.setSearchMaxMetacritic(100);
        props.model.setDates("2015-01-01,2023-12-31");
        props.model.doSearch(false); //refresh searchResults from previous searches
        props.model.setShowAbout(false); //functionality to not render about page
    }
}