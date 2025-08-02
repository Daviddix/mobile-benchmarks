import { useEffect, useState } from "react";
import SingleRequest from "./components/SingleRequest/SingleRequest"
import "./Requests.css"
import { requestType } from "./types/requests";

function Requests() {
  const [allRequests, setAllRequests] = useState<requestType[]>([])

  async function getAllRequests(){
    setAllRequests([])
    try{
      const rawFetch = await fetch("http://localhost:3000/api/request/get-all",{
        credentials : "include"
      })

      const responseInJson = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error(responseInJson.message)
      }

      setAllRequests(responseInJson)
    }
    catch(err){
      console.log(err)
      alert("Couldn't fetch all requests, check console for more info")
    }
  }

  const mappedRequests = allRequests.map((request)=>{
    return <SingleRequest 
    refetchFunction={getAllRequests}
    _id={request._id}
    key={request._id}
    requestItem={request.requestItem}
    requestType={request.requestType}
    />
  })

  useEffect(()=>{
    getAllRequests()
  }, [])

  return (
    <main className='requests-main'>
        <div className="requests-inner">
            <div className="title">
            <h1>Requests</h1>
            <small>{allRequests.length}</small>
            </div>

            <div className="all-requests-container">
                
               {
                mappedRequests
               }

            </div>
        </div>
    </main>
  )
}

export default Requests