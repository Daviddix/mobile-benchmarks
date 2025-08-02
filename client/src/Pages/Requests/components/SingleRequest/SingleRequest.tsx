import { requestType } from "../../types/requests"
import "./SingleRequest.css"

type singleRequestProp = requestType & {
    refetchFunction : ()=> void
}

function SingleRequest({requestItem, requestType, _id, refetchFunction} : singleRequestProp) {

    async function approveRequest(requestId: string){
    try{
      const rawFetch = await fetch(`https://mobile-benchmarks.onrender.com/api/request/add/${requestId}`, {
        method : "PUT",
        credentials : "include"
      })
      const responseInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("Error approving request", {cause : responseInJson})
      }
      console.log("Submission approved successfully")
      refetchFunction() // Refresh the list after approval
    }catch(err){
      console.log("Error declining submission")
      console.log(err)
  }}

  async function deleteRequest(requestId: string){
    try{
      const rawFetch = await fetch(`https://mobile-benchmarks.onrender.com/api/request/delete/${requestId}`, {
        method : "DELETE",
        credentials : "include"
      })
      const responseInJson = await rawFetch.json()
      if(!rawFetch.ok){
        throw new Error("Error deleting request", {cause : responseInJson})
      }
      console.log("Submission DELETED successfully")
      refetchFunction() // Refresh the list after approval
    }catch(err){
      console.log("Error declining submission")
      console.log(err)
  }}
  return (
    <div className="single-request">
                    <div className="request-container">
                        <div className="request-container-header">
                            <h3>{requestType}</h3>
                        </div>

                        <p>{requestItem}</p>
                    </div>

                    <div className="single-request-buttons">
                        <button
                        onClick={()=>{
                            deleteRequest(_id)
                        }}
                        className="discard">Discard</button>

                        <button
                        onClick={()=>{
                            approveRequest(_id)
                        }}
                        className="add">Added</button>
                    </div>
                </div>
  )
}

export default SingleRequest