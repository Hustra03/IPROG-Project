import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";



export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() {

        if (!auth.currentUser) {

            props.model.setLoggingIn(true);
            signInWithPopup(auth, provider);
            props.model.setCurrentUser(auth.currentUser);
        }
        else {
            props.model.setLoggingIn(false);
            signOut(auth);
            props.model.setCurrentUser(null);

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
            toastBody={props.model.toastBody}
            loginCustomEvent={loginCustomEventHandler}
            yodafyCustomEvent={yodafyCustomEventHandler}
            searchCustomEvent={onSearchButtonPressCustomEventHandler}
            onQueryInputChange={onQueryInputChangeCustomEventHandler}
            toastBodyChange={onToastBodyChangeCustomEventHandler}
        />

    );

    function onToastBodyChangeCustomEventHandler(toastBody) {
        props.model.setToastBody(toastBody);
    }
    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }
    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(props.model.searchParams);
    }
}