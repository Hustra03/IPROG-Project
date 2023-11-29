import "/src/style.css"

import DropdownMenu from '@innologica/vue-dropdown-menu'

//Above is a custom component

function HeaderView(props) {

    function loginButtonPressedCB() { console.log("Log button pressed"); props.loginCustomEvent(); }
    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }
    function savedPagesButtonPressedCB() { }

    function searchImagePressedCB() { console.log("Search Image pressed"); props.searchCustomEvent(); }

    function loggedIn() {
        if (props.loggedIn == null) {
            return (
                <div>
                    <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>
                </div>
            )
        }
        return (
            <div>
                <div>Current User: {props.loggedIn.displayName}</div>
                <div>Email: {props.loggedIn.email}</div>
                <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Sign Out</button>
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
        <div>
            <div className="HeaderTitle">Yodas Gaming Wiki</div>
            {yodafiedText()}
            {loggedIn()}
            {yodafyButton()}
            {savedPages()}
            <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
        </div>
    )

}

export { HeaderView }