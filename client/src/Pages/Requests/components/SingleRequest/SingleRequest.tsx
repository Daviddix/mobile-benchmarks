import { requestType } from "../../types/requests"
import "./SingleRequest.css"

function SingleRequest({requestItem, requestType} : requestType) {
  return (
    <div className="single-request">
                    <div className="request-container">
                        <div className="request-container-header">
                            <h3>{requestType}</h3>
                        </div>

                        <p>{requestItem}</p>
                    </div>

                    <div className="single-request-buttons">
                        <button className="discard">Discard</button>

                        <button className="add">Added</button>
                    </div>
                </div>
  )
}

export default SingleRequest