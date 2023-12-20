import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

//File mainly worked on by Erik Paulinder


import { CDropdown, CDropdownToggle, CDropdownMenu, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CSpinner, } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/getting-started/introduction.html
// Custom component, https://coreui.io/vue/docs/forms/select.htm
// Custom component, https://coreui.io/vue/docs/components/alert.html 

import { CAlert, CBreadcrumb, CBreadcrumbItem } from '@coreui/vue'

function HeaderView(props) {

    function loginButtonPressedCB() {
        props.loginCustomEvent();
    }

    function signOutButtonPressedCB() {
        props.signOutCustomEvent();
    }

    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }
    function savedPagesButtonPressedCB() { window.location.hash = "#/savedPages"; }

    function closedAlertCB() { props.closeAlert(); }
    function alert() {

        if (props.alertBody) {
            return (
                <CAlert color="success" visible={props.alertVisability}>{props.alertBody} <CButton onClick={closedAlertCB}>X</CButton></CAlert>
            )
        }
    }

    function UpperHalfButtons() {
        function currentlyLoggingInFuction() {

            if (props.loggingIn == true) {
                return <CSpinner color="primary" />;
            }
        }

        if (props.loggedIn) {
            return (
                <div className="LoggedIn">
                    <CButton onClick={savedPagesButtonPressedCB} type="submit" color="success">Saved Pages</CButton>
                    <CButton onClick={signOutButtonPressedCB} type="submit" color="success">Sign Out</CButton>
                    <img className="userIcon" src={props.loggedIn.photoURL} alt="user icon" />
                </div>
            )
        } return (
            <div className="LoggedIn">
                <CButton onClick={loginButtonPressedCB} type="submit" color="success">Login</CButton>
                {currentlyLoggingInFuction()}
            </div>
        )

    }

    function HeaderLowerButtons() {
        if (props.loggedIn) {
            return (
                <div>
                    {searchButton()}
                </div>)

        }
        return (<div>{searchButton()} {yodafyButton()}</div>)
    }

    function yodafyButton() {
        if (!props.yodafy) {
            return <CButton onClick={yodafyButtonPressedCB} type="submit" color="success">Yodafy</CButton>
        }
        return <CButton onClick={yodafyButtonPressedCB} type="submit" color="success">De-Yodafy</CButton>
    }


    function searchInputCB(evt) { props.onQueryInputChange(evt.target.value); }

    function searchButtonPressedCB() {
        props.searchCustomEvent();
        window.location.hash = "#/searchResult";
    }

    function searchButton() {
        return (<div>
            <CFormInput type="text" value={props.query} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />
            <CButton onClick={searchButtonPressedCB} type="submit" color="success">Search!</CButton>
            <CButton onClick={headerDetailedSearchClickedHandler} type="submit" color="success">Go To Detailed Search</CButton>

            {yodafyButton()}
        </div>//TODO implement all search parameters correctly when API implemented for testing
        )
    }

    function headerTitleClickedHandler() {
        props.headerTitleClicked();
        window.location.hash = "/";
    }

    function headerDetailedSearchClickedHandler() {
        window.location.hash = "#/search";
    }

    function breadcrumb() {
        function breadcrumbContent() {
            if (props.currentLocation.endsWith("#/")) {
                return (
                    <>
                        <CBreadcrumbItem active>Home</CBreadcrumbItem>
                    </>
                )
            }
            if (props.currentLocation.endsWith("#/savedPages")) {
                return (
                    <>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Saved Pages</CBreadcrumbItem>
                    </>

                )
            }
            if (props.currentLocation.endsWith("#/search")) {
                return (
                    <>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem active>Search</CBreadcrumbItem>
                    </>
                )

            }
            if (props.currentLocation.endsWith("#/searchResult")) {
                return (
                    <>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem href="#/search">Search</CBreadcrumbItem>
                        <CBreadcrumbItem active>Search Results</CBreadcrumbItem>
                    </>
                )
            }
            if (props.currentLocation.endsWith("#/details")) {
                return (
                    <>
                        <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
                        <CBreadcrumbItem href="#/search">Search</CBreadcrumbItem>
                        <CBreadcrumbItem href="#/searchResult">Search Results</CBreadcrumbItem>
                        <CBreadcrumbItem active>Details</CBreadcrumbItem>
                    </>
                )
            }
            return (
                <CBreadcrumbItem href="#">Home</CBreadcrumbItem>
            )
        }

        return (
            <CBreadcrumb style="--cui-breadcrumb-divider: '>'">
                {breadcrumbContent}
            </CBreadcrumb>
        )

    }

    return (
        <div className="header">


            <div className="HeaderLeftHalf">
                <h1 className="HeaderTitle" disabled={props.currentCat == 0} onClick={headerTitleClickedHandler}>Yoda's Gaming Wiki</h1>
                {breadcrumb()}
            </div>
            {alert()}

            <div className="HeaderRightHalf">
                <div className="HeaderUpperButtons">
                    {UpperHalfButtons()}
                </div>
                <div className="HeaderLowerButtons">
                    {HeaderLowerButtons()}
                </div>
            </div>

        </div >
    )

}

export { HeaderView }