function ViewingHistoryView(props) {
//file mainly worked on by William Ma Jönsson
    function showHistoryCB(game){
        return(
            <div>
                {game.name}
            </div>
        )
    }

    return (
        <div className="ViewingHistory">

            <h1>View History</h1>
            {props.viewHistory.map(showHistoryCB)}
        </div>
    )

}

export default ViewingHistoryView