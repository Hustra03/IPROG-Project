import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import { CDropdown, CDropdownToggle, CDropdownMenu, CForm, CFormInput, CFormLabel, CFormSelect, CButton } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/components/toast.html
// Custom component, https://coreui.io/vue/docs/getting-started/introduction.html
// Custom component, https://coreui.io/vue/docs/forms/select.htm

function HeaderView(props) {

    function loginButtonPressedCB() {
        console.log("Log button pressed"); props.loginCustomEvent();
    }
    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }
    function savedPagesButtonPressedCB() { window.location.hash = "#/savedPages"; }

    function UpperHalfButtons() {
        if (props.loggedIn == null) {
            return (
                <div className="LoggedIn">
                    <CButton onClick={loginButtonPressedCB} type="submit" color="success">Login</CButton>
                    <img className="userIcon" src="https://placekitten.com/37/37" alt="user icon" />
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


    function searchInputCB(evt) { props.onSearchInputChange(evt.target.value); }

    function searchButton() {
        return (<CDropdown auto-close="outside">
            <CDropdownToggle color="success">Search</CDropdownToggle>
            <CDropdownMenu>
                <CForm className="px-4 py-4">
                    <div className="mb-3">
                        <CFormLabel for="queryForm">Search Query</CFormLabel>
                        <CFormInput type="text" value={props.text} onChange={searchInputCB} id="queryForm" placeholder="Star Wars, The Force Awakens" />
                    </div>
                    <div className="mb-3">
                        <CFormLabel for="exampleDropdownFormPassword1">Password</CFormLabel>
                        <CFormInput type="text" value={props.text} onChange={searchInputCB} id="exampleDropdownFormPassword1" placeholder="Password" />
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

                    <CButton type="submit">Search!</CButton>
                </CForm>
            </CDropdownMenu>
        </CDropdown>
            //TODO implement all search parameters correctly when API implemented for testing
        )
    }

    return (
        <div className="header">


            <div className="HeaderLeftHalf">
                <h1 className="HeaderTitle">Yodas Gaming Wiki</h1>
            </div>

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