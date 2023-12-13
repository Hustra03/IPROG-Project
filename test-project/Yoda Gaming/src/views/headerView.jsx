import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

//File mainly worked on by Erik Paulinder


import { CDropdown, CDropdownToggle, CDropdownMenu, CForm, CFormInput, CFormLabel, CFormSelect, CButton, CSpinner, } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/components/toast.html
// Custom component, https://coreui.io/vue/docs/getting-started/introduction.html
// Custom component, https://coreui.io/vue/docs/forms/select.htm


import { CToast, CToastHeader, CToastBody, CToastClose } from '@coreui/vue';


function HeaderView(props) {

    function loginButtonPressedCB() {
        console.log("Log button pressed"); props.loginCustomEvent();
    }

    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }
    function savedPagesButtonPressedCB() { window.location.hash = "#/savedPages"; }

    function toast() {

        if (props.loggingIn) {

            if (props.loggedIn) {
                props.toastBodyChange(props.loggedIn.email + " Signed In Successfully");
            }
            else { 
                props.toastBodyChange("Signing In"); 
            }

        }
        else {
            if (props.loggingIn == false) {
                props.toastBodyChange("Logged Out");
            }

        } if (props.toastBody) {
            return (
                <CToast delay={2000} color="success" class="align-items-center" visible>
                    <CToastBody>
                        {props.toastBody}
                    </CToastBody>
                </CToast>
            )
        }
    }

    function UpperHalfButtons() {
        function currentlyLoggingInFuction() {

            if (props.loggingIn == true) {
                return <CSpinner color="primary" />;
            }
        }

        if (!props.loggedIn) {
            return (
                <div className="LoggedIn">
                    <CButton onClick={loginButtonPressedCB} type="submit" color="success">Login</CButton>
                    {currentlyLoggingInFuction()}
                </div>
            )
        }
        return (
            <div className="LoggedIn">
                <CButton onClick={loginButtonPressedCB} type="submit" color="success">Sign Out</CButton>
                <img className="userIcon" src={props.loggedIn.photoURL} alt="user icon" />
            </div>
        )
    }

    function HeaderLowerButtons() {
        if (props.loggedIn) {
            return (
                <div>
                    <CButton onClick={savedPagesButtonPressedCB} type="submit" color="success">Saved Pages</CButton>
                    {searchButton()}
                    {yodafyButton()}
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

    function searchButtonPressedCB() { props.searchCustomEvent(); window.location.hash = "#/searchResult"; }

    function searchButton() {
        return (<CDropdown auto-close="outside">
            <CDropdownToggle color="success">Search</CDropdownToggle>
            <CDropdownMenu>
                <CForm className="px-4 py-4">
                    <div className="mb-3">
                        <CFormLabel for="queryForm">Search Query</CFormLabel>
                        <CFormInput type="text" value={props.query} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />
                    </div>

                    <CButton onClick={searchButtonPressedCB} type="submit" color="success">Search!</CButton>
                    <div><a href='#/search'>Detailed Search</a></div>
                </CForm>
            </CDropdownMenu>
        </CDropdown>
            //TODO implement all search parameters correctly when API implemented for testing
        )
    }

    function headerTitleClicked() {
        window.location.hash = "/";
    }

    return (
        <div className="header">


            <div className="HeaderLeftHalf">
                <h1 className="HeaderTitle" onClick={headerTitleClicked}>Yodas Gaming Wiki</h1>

            </div>
            {toast()}
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