import { useState } from "react";
import RequestItemModal from "../RequestItemModal/RequestItemModal";
import "./RequestItem.css";
import { useLoggedInChecker } from "../../../../hooks/useLoggedInChecker";
import { useSetAtom } from "jotai";
import { showUserOnlyModalAtom } from "../../../../globals/states";
import emptyIllustrationPhone from "./assets/icons/phone-empty.svg"
import emptyIllustrationGame from "./assets/icons/game-empty.svg"

type requestItemProps = {
  itemType: "Game" | "Phone";
};

function RequestItem({ itemType }: requestItemProps) {
  const [showRequestItemModal, setShowRequestItemModal] = useState(false);
  const isLoggedIn = useLoggedInChecker()
  const setShowUserOnlyModal = useSetAtom(showUserOnlyModalAtom)

  return (
    <>
      {showRequestItemModal && (
        <RequestItemModal
          closeFn={() => setShowRequestItemModal(false)}
          requestType={itemType == "Game" ? "Game" : "Phone"}
        />
      )}
      <div className="request-item">
        <img src={itemType == "Game" ? emptyIllustrationGame : emptyIllustrationPhone} alt="empty illustration" />
        <h3>Your {itemType == "Game" ? "game" : "phone"} isn’t listed yet</h3>

        <p>
          We're always adding more {itemType == "Game" ? "games" : "phones"} to
          our database. Submit a request, and we’ll prioritize it
        </p>

        <button
        onClick={() => {
          if(isLoggedIn){
            setShowRequestItemModal(true)
          }else{
            setShowUserOnlyModal(true)
          }
        }}
        >Request For a {itemType == "Game" ? "Game" : "Phone"}</button>
      </div>
    </>
  );
}

export default RequestItem;
