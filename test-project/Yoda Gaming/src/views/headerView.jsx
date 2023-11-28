import "/src/style.css"

function HeaderView(props) {

    function loginButtonPressedCB() { console.log("Log button pressed"); props.loginCustomEvent(); }
    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }

    function searchImagePressedCB() { console.log("Search Image pressed"); props.searchCustomEvent(); }

    function loggedIn() {
        if (true) {
            return <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>;
        }
        return <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Sign Out</button>;
    }//TODO Fix above section when per-user persitence has been implemented so login when not logged in, and sign out when logged in

    if (props.yodafy) {
        return <div>
            {loggedIn()}
            <div className="HeaderTitle">Yodas Gaming Wiki</div>
            <div>Example Text: "The beam dropped down on the workmen's head. Read verse out loud for pleasure."</div>

            {loggedIn()}
            <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">Yodafy</button>
            <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
        </div>
    }
    return <div>
        <div className="HeaderTitle">Yodas Gaming Wiki</div>
        <div> Example Text: "The beam dropped down on the workmen's head. Verse out loud for pleasure read." </div>
        {loggedIn()}
        <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">De-Yodafy</button>
        <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
    </div>
}

export { HeaderView }