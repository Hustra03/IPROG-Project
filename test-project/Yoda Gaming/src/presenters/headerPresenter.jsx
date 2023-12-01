import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";

import { push } from './index.jsx'
export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() {

        if (!auth.currentUser) {
            signInWithPopup(auth, provider);
            props.model.user = auth.currentUser;
        }
        signOut(auth);
        props.model.user = null;
    }
    function yodafyCustomEventHandler() {
        props.model.toggleYodafyValue();
    }
    function searchCustomEventHandler() { }
    return (
        
            <HeaderView
                type={props.model.searchParams.type}
                yodafy={props.model.yodafy}
                loggedIn={props.model.user}
                loginCustomEvent={loginCustomEventHandler}
                yodafyCustomEvent={yodafyCustomEventHandler}
                searchCustomEvent={searchCustomEventHandler}
                onSearchInputChange={onSearchInputChangeCustomEventHandler}
                savedPagesCustomEvent={savedPagesCustomEventHandler}
            />
            
    );

    function onSearchInputChangeCustomEventHandler(text) {
        props.model.setSearchQuery(text);
    }
    function onSearchSelectChangeCustomEventHandler(type) {
        props.model.setSearchType(type);
    }
    function onSearchButtonPressCustomEventHandler() {
        props.model.doSearch(props.model.searchParams);
    }
    function savedPagesCustomEventHandler()
    {
        window.location.hash = "#/initialPage";
    }
}