

function getCurrentGameUpvotes(gamesArray, gameID){
    const game = gamesArray.find(game => game.gameID === gameID);
    if (!game)
        return 0;
    return game.upvotes;
}

export {getCurrentGameUpvotes}