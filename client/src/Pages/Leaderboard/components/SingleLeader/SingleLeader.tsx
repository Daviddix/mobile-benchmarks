import "./SingleLeader.css"

type SingleLeaderProps = {
    userRank : number;
    userName : string;
    userPoints : number;
}

function SingleLeader({userRank, userName, userPoints} : SingleLeaderProps) {
    let rankIcon : string | number = ""
    if(userRank == 1){
     rankIcon = "🥇"
    }else if(userRank == 2){
     rankIcon = "🥈"
    }else if(userRank == 3){
     rankIcon = "🥈"
    }else{
        rankIcon = userRank
    }
  return (
    <div className="single-leader">
                    <div>{rankIcon}</div>
                    <p>{userName}</p>
                    <p>{userPoints}</p>
                </div>
  )
}

export default SingleLeader