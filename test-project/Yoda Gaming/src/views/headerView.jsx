import "/src/style.css"

function HeaderView(props) {

    function loginButtonPressedCB(){console.log("Log button pressed"); props.loginCustomEvent();}
    function yodafyButtonPressedCB(){console.log("Yodafy button pressed");  props.yodafyCustomEvent();}
    
    function searchImagePressedCB(){console.log("Search Image pressed"); props.searchCustomEvent();}
    return (
        <div>

            <div className="HeaderTitle">Yodas Gaming Wiki</div>
            {yodafyToText(props.yodafy)}
            <button onClick={loginButtonPressedCB} className="HeaderLoginButton">Login</button>
            <button onClick={yodafyButtonPressedCB} className="HeaderYodafyButton">Yodafy</button>
            <img onClick={searchImagePressedCB} className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
        </div>

    )
    
    function yodafyToText(yodafy)
    {
        if (yodafy) {
            return <div>true</div>;
        }
        else {return <div>false</div>;}
    }
}

export { HeaderView }