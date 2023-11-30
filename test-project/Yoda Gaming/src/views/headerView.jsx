import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownDivider, CDropdownItem, CForm, CFormInput, CFormLabel, CFormCheck, CFormSelect, CButton } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/components/toast.html
// Custom component, https://coreui.io/vue/docs/getting-started/introduction.html
// Custom component, https://coreui.io/vue/docs/forms/select.html

function HeaderView(props) {

    function loginButtonPressedCB() {
        console.log("Log button pressed"); props.loginCustomEvent();
    }
    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }
    function savedPagesButtonPressedCB() { }

    function UpperHalfButtons() {
        if (props.loggedIn == null) {
            return (
                <div className="LoggedIn">
                    <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>
                    {yodafyButton()}
                </div>
            )
        }
        return (
            <div className="LoggedIn">
                <div>Current User: {props.loggedIn.displayName}</div>
                <div>Email: {props.loggedIn.email}</div>
                <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Sign Out</button>
                {yodafyButton()}
            </div>
        )
    }//TODO Fix above section when per-user persitence has been implemented so login when not logged in, and sign out when logged in

    function yodafiedText() {
        if (props.yodafy) {
            return <div>Example Text: "The beam dropped down on the workmen's head. Read verse out loud for pleasure."</div>
        }
        return <div> Example Text: "The beam dropped down on the workmen's head. Verse out loud for pleasure read." </div>
    }

    function savedPages() {
        if (props.loggedIn) {
            return <button onClick={savedPagesButtonPressedCB}>Saved Pages</button>
        }
    }

    function yodafyButton() {
        if (!props.yodafy) {
            return <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">Yodafy</button>
        }
        return <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">De-Yodafy</button>
    }

    function toast() {
        console.log("Toast Pressed");
        return <component ></component>;
    }

    return (
        <div className="HeaderEntire">

            <div className="HeaderUpperHalf">
                <div className="HeaderTitle">Yodas Gaming Wiki</div>
                <div className="HeaderUpperButtons">
                    {UpperHalfButtons()}
                </div>
            </div>
            <div className="HeaderLowerHalf">

                <div className="HeaderExampleText">
                    {yodafiedText()}
                    <CButton onClick={toast} type="submit" color="primary">Toast</CButton>
                </div>
                <div className="HeaderLowerButtons">
                    {savedPages()}


                    <CDropdown auto-close="outside">
                        <CDropdownToggle color="primary">Search</CDropdownToggle>
                        <CDropdownMenu>

                            <CForm className="px-4 py-4">
                                <div className="mb-3">
                                    <CFormLabel for="queryForm">Search Query</CFormLabel>
                                    <CFormInput type="text" id="queryForm" placeholder="Star Wars, The Force Awakens" />
                                </div>
                                <div className="mb-3">
                                    <CFormLabel for="exampleDropdownFormPassword1">Password</CFormLabel>
                                    <CFormInput type="text" id="exampleDropdownFormPassword1" placeholder="Password" />
                                </div>
                                <div>
                                    <CFormSelect aria-label="Default select example">
                                        <option>Genre</option>
                                        <option value="RPG">RPG</option>
                                        <option value="MMO">MMO</option>
                                        <option value="Romance">Romance</option>
                                    </CFormSelect>
                                </div>

                                <div>
                                    <CFormSelect aria-label="Default select example">
                                        <option>Sort By</option>
                                        <option value="Popularity">Popularity</option>
                                        <option value="Trending">Trending</option>
                                    </CFormSelect>
                                </div>

                                <div className="mb-3">
                                    <CFormCheck id="dropdownCheck" label="Remember me" />
                                </div>
                                <CButton type="submit">Sign in</CButton>
                            </CForm>
                            <CDropdownDivider />
                            <CDropdownItem href="#">New around here? Sign up</CDropdownItem>
                            <CDropdownItem href="#">Forgot password?</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    {/*TODO Add options for search query and function for search submission*/}


                </div>
            </div>

        </div >
    )

}

export { HeaderView }