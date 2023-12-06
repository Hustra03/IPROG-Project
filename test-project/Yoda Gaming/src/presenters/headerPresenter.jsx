import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";

export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() {

        if (!auth.currentUser) {
            
            props.model.setCurrentUser(false);
            signInWithPopup(auth, provider);
            props.model.setCurrentUser(auth.currentUser);
        }
        signOut(auth);
        props.model.setCurrentUser(null);
    }
    function yodafyCustomEventHandler() {
        props.model.toggleYodafyValue();
    }
    return (
        
            <HeaderView
            query={props.model.searchParams.query}
                yodafy={props.model.yodafy}
                loggedIn={props.model.user}
                loginCustomEvent={loginCustomEventHandler}
                yodafyCustomEvent={yodafyCustomEventHandler}
                searchCustomEvent={onSearchButtonPressCustomEventHandler}
                onQueryInputChange={onQueryInputChangeCustomEventHandler}
            />
            
    );

    function onQueryInputChangeCustomEventHandler(query) {
        props.model.setSearchQuery(query);
    }
    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(props.model.searchParams);
    }
}