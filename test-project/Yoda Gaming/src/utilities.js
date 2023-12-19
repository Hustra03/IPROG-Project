

function getCurrentGameUpvotes(gamesArray, gameID){
    const game = gamesArray.find(game => game.gameID === gameID);
    if (!game ||!game.upvotes)
        return 0;
    return game.upvotes.length;
}

export {getCurrentGameUpvotes}