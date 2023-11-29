import { auth, provider, signOut, signInWithPopup } from "../firebaseModel.js";
import { HeaderView } from "../views/headerView.jsx";
import Toasted from 'vue-toasted';

export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() {

        

        if (!auth.currentUser) {
            signInWithPopup(auth, provider);
            props.model.user = auth.currentUser;
        }
        console.log(props.model.user);
        signOut(auth);
        props.model.user = null;
    }
    function yodafyCustomEventHandler() {
        props.model.toggleYodafyValue();
    }
    function searchCustomEventHandler() { }
    return (
        <div>
            <HeaderView
                yodafy={props.model.yodafy}
                loggedIn={props.model.user}
                loginCustomEvent={loginCustomEventHandler}
                yodafyCustomEvent={yodafyCustomEventHandler}
                searchCustomEvent={searchCustomEventHandler}
            />
        </div>
    );
}