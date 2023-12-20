//As an example of how rating view could be implemented

export function RatingView()
{
    let rating = 4;
    if (rating == 1) {
        return (<div>
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        </div>)

    }
    if (rating == 2) {
        return (<div>
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        </div>)

    }
    if (rating == 3) {
        return (<div>
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        </div>)

    }
    if (rating == 4) {
        return (<div>
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        </div>)

    }    
    if (rating == 5) {
        return (<div>
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        <img src="https://www.shareicon.net/data/16x16/2015/07/18/71338_user_32x32.png" alt="" />
        </div>)

    }
}