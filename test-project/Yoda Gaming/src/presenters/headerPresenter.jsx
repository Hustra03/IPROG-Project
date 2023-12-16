import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";



export default
    function HeaderPresenter(props) {

    function loginCustomEventHandler() {
        props.model.setLoggingIn(true);
        signInWithPopup(auth, provider).then(props.model.setCurrentUser(auth.currentUser));
    }

    function signOutCustomEventHandler() {
        props.model.signOut();
        signOut(auth);
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
            loginCustomEvent={loginCustomEventHandler}
            signOutCustomEvent={signOutCustomEventHandler}
            yodafyCustomEvent={yodafyCustomEventHandler}
            searchCustomEvent={onSearchButtonPressCustomEventHandler}
            onQueryInputChange={onQueryInputChangeCustomEventHandler}
            alertBodyChange={onAlertBodyChangeCustomEventHandler}
            closeAlert={closeAlertCustomEventHandler}
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
        props.model.doSearch(true);
    }
}