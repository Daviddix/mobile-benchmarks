import "./Badge.css"

type badgeProps = {
    rating : number
}

function Badge({rating} : badgeProps){
    type ratingTypes = "high" | "medium" | "low" | ""
    let gameRatingText : ratingTypes = ""
    if(rating >= 80){
        gameRatingText = "high"
    }else if(rating >= 60){
        gameRatingText = "medium"
    }else{
        gameRatingText = "low"
    }

    return(
        <div className={`badge ${gameRatingText}`}>
                <p>{rating}%</p>
        </div>
    )
}

export default Badge