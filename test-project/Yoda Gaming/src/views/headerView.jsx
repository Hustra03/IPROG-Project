import '@coreui/coreui/dist/css/coreui.min.css'
import "/src/style.css"

import DropdownMenu from '@innologica/vue-dropdown-menu'

//Above is a custom component, https://github.com/Innologica/vue-dropdown-menu

import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CToast, CToastBody } from '@coreui/vue';
// Custom component, https://coreui.io/vue/docs/components/dropdown.html
// Custom component, https://coreui.io/vue/docs/components/toast.html

function HeaderView(props) {

    function loginButtonPressedCB() {
        console.log("Log button pressed"); props.loginCustomEvent();

          return  <CToast v-for="(toast, index) in toasts">
                    <CToastHeader closeButton>
                        <span class="me-auto fw-bold">{{ toast, title }}</span>
                        <small>7 min ago</small>
                    </CToastHeader>
                    <CToastBody>
                        {{ toast, content }}
                    </CToastBody>
                </CToast>

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
                </div>
                <div className="HeaderLowerButtons">
                    {savedPages()}


                    <CDropdown>
                        <CDropdownToggle color="primary">Search</CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem href="#">Action</CDropdownItem>
                            <CDropdownItem href="#">Another action</CDropdownItem>
                            <CDropdownItem href="#">Something else here</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>


                </div>
            </div>

        </div >
    )

}

export { HeaderView }