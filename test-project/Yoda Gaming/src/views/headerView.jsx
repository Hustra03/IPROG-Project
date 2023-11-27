import "/src/style.css"

function HeaderView() {

    return (
        <div>

            <div className="HeaderTitle">Yodas Gaming Wiki</div>
            <button className="HeaderLoginButton">Login</button>
            <button className="HeaderYodafyButton">Yodafy</button>
            <img className="HeaderSearchButton" src="http://placekitten.com/200/300" height={100} alt="" />
        </div>

    )
}

export { HeaderView }