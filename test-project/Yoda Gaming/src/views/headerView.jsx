import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

//File mainly worked on by Erik Paulinder

import {CFormInput, CButton, CSpinner, } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/getting-started/introduction.html
// Custom component, https://coreui.io/vue/docs/forms/select.htm
// Custom component, https://coreui.io/vue/docs/components/alert.html 

import { CAlert, CBreadcrumb, CBreadcrumbItem } from '@coreui/vue'

function HeaderView(props) {

    function loginButtonPressedCB() {
        props.loginCustomEventCB();
    }

    function signOutButtonPressedCB() {
        props.signOutCustomEventCB();
    }

    function savedPagesButtonPressedCB() { props.setDeleteStateFalseCustomEventCB(); window.location.hash = "#/savedPages"; }

    function closedAlertCB() { props.closeAlertCustomEventCB(); }
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
                    {props.loggedIn.photoURL ? <img className="userIcon" src={props.loggedIn.photoURL} alt="user icon" /> : null}
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
        return (<div>{searchButton()}</div>)
    }

    function searchInputCB(evt) { props.onQueryInputChangeCustomEventCB(evt.target.value); }

    function searchButtonPressedCB() {
        props.searchCustomEventCB();
        window.location.hash = "#/searchResult";
    }

    function searchButton() {
        return (<div>

            <div className="HeaderSearchInput">
                <CFormInput type="text" value={props.query} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />
            </div>
            <CButton onClick={searchButtonPressedCB} type="submit" color="success">Search!</CButton>
            <CButton onClick={headerDetailedSearchClickedHandlerCB} type="submit" color="success">Go To Detailed Search</CButton>
        </div>//TODO implement all search parameters correctly when API implemented for testing
        )
    }

    function headerTitleClickedHandlerCB() {
        props.headerTitleClickedCustomEventCB();
        window.location.hash = "/";
    }

    function headerDetailedSearchClickedHandlerCB() {
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
                {breadcrumbContent()}
            </CBreadcrumb>
        )

    }

    return (
        <div className="header">


            <div className="HeaderLeftHalf">
                <div className="HeaderTitleSection">
                    <img className='dontsquishyoda' onClick={headerTitleClickedHandlerCB} src="https://www.shareicon.net/data/128x128/2016/01/16/248175_yoda_32x32.png" alt="" />
                    <h1 className="HeaderTitle" disabled={props.currentCat == 0} onClick={headerTitleClickedHandlerCB}>Yoda Gaming</h1>
                </div>

                <div className="HeaderBreadcrumbsSection">
                    {breadcrumb()}
                </div>
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