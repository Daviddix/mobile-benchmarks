import "./DeleteFormButton.css";
import trashIcon from "./assets/trash-icon.svg";

type deleteFormButtonProps = {
  id: number;
  setFormAmount: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        isLast: boolean;
      }[]
    >
  >;
  setContributeGameData: React.Dispatch<
    React.SetStateAction<null | contributeGameDataType>
  >;
  formAmount: {
    id: number;
    isLast: boolean;
  }[];
  contributeGameData: null | contributeGameDataType;
};

function DeleteFormButton({
  id,
  setFormAmount,
  setContributeGameData,
  contributeGameData,
  formAmount,
}: deleteFormButtonProps) {
  function deleteForm(formId: number) {
    const currentForm = formAmount.find((item) => item.id === formId);
    if (!currentForm) return;

    // Create a new copy of formAmount to avoid mutation
    let updatedFormAmount = formAmount.filter((item) => item.id !== formId);

    // If the deleted form was the last, mark the new last item
    if (currentForm.isLast && updatedFormAmount.length > 0) {
      updatedFormAmount = updatedFormAmount.map((item, index, arr) => ({
        ...item,
        isLast: index === arr.length - 1,
      }));
    }

    setFormAmount(updatedFormAmount);

    // If contributeGameData is populated, update its gameInfo
    if (contributeGameData && contributeGameData.gameInfo) {
      const updatedGameInfo = contributeGameData.gameInfo?.filter(
        (_: any, index: number) => index !== formId - 1
      );

      setContributeGameData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          gameInfo: updatedGameInfo,
          phoneInfo: prev.phoneInfo, // Ensure phoneInfo is preserved
        };
      });
    }
  }

  return (
    <button
      onClick={() => deleteForm(id)}
      type="button"
      className="delete-form"
    >
      <img src={trashIcon} alt="Delete form icon" />
    </button>
  );
}

export default DeleteFormButton;
