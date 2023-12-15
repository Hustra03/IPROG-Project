import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";



export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() {


        if (!auth.currentUser) {

            props.model.setLoggingIn(true);
            signInWithPopup(auth, provider);
            props.model.setCurrentUser(auth.currentUser);
            props.model.setAlertBody("Signed In");
        }
        else {
            props.model.setAlertBody(props.model.user.email + " Logged Out");
            props.model.setLoggingIn(false);
            signOut(auth);
            props.model.setCurrentUser(null);

        }
        props.model.setAlertVisability(true);

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
            loginCustomEvent={loginCustomEventHandler}
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
        props.model.doSearch(true, props.model.searchParams);
    }
}