import "/src/style.css"

function HeaderView(props) {

    function loginButtonPressedCB() { console.log("Log button pressed"); props.loginCustomEvent(); }
    function yodafyButtonPressedCB() { console.log("Yodafy button pressed"); props.yodafyCustomEvent(); }

    function searchImagePressedCB() { console.log("Search Image pressed"); props.searchCustomEvent(); }


    if (props.yodafy) {
        return<div>
            <div className="HeaderTitle">Yodas Gaming Wiki</div>
            <div>Example Text: "The beam dropped down on the workmen's head. Read verse out loud for pleasure."</div>
            <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>
            <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">Yodafy</button>
            <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
        </div>
    }
    return<div>
        <div className="HeaderTitle">Yodas Gaming Wiki</div>
        <div> Example Text: "The beam dropped down on the workmen's head. Verse out loud for pleasure read." </div>
        <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>
        <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">Yodafy</button>
        <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
    </div>
}

export { HeaderView }