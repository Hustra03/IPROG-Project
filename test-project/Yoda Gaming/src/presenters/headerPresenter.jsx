import { HeaderView } from "../views/headerView.jsx";
export default
    function HeaderPresenter(props) {
    function loginCustomEventHandler() { }
    function yodafyCustomEventHandler() {
        props.model.toggleYodafyValue();
    }
    function searchCustomEventHandler() { }
    return (
        <div>
            <HeaderView
                yodafy={props.model.yodafy}
                loginCustomEvent={loginCustomEventHandler}
                yodafyCustomEvent={yodafyCustomEventHandler}
                searchCustomEvent={searchCustomEventHandler}
            />
        </div>
    );
}