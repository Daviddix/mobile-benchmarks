import { useState } from "react";
import RequestItemModal from "../RequestItemModal/RequestItemModal";
import "./RequestItem.css";

type requestItemProps = {
  itemType: "Game" | "Phone";
};

function RequestItem({ itemType }: requestItemProps) {
  const [showRequestItemModal, setShowRequestItemModal] = useState(false);

  return (
    <>
      {showRequestItemModal && (
        <RequestItemModal
          closeFn={() => setShowRequestItemModal(false)}
          requestType={itemType == "Game" ? "Game" : "Phone"}
        />
      )}
      <div className="request-item">
        <h3>Your {itemType == "Game" ? "game" : "phone"} isn’t listed yet</h3>

        <p>
          We're always adding more {itemType == "Game" ? "games" : "phones"} to
          our database. Submit a request, and we’ll prioritize it
        </p>

        <button
        onClick={() => setShowRequestItemModal(true)}
        >Request For a {itemType == "Game" ? "Game" : "Phone"}</button>
      </div>
    </>
  );
}

export default RequestItem;
