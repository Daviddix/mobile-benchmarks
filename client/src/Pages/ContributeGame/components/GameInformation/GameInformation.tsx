import { useState } from "react";
import "./GameInformation.css"
import GameInformationForm from './components/GameInformationForm/GameInformationForm'

type gameInformationProps = {
  contributeGameData: contributeGameDataType | null;
  setContributeGameData: React.Dispatch<
    React.SetStateAction<null | contributeGameDataType>
  >;
};

function GameInformation({
  contributeGameData,
  setContributeGameData,
}: gameInformationProps) {
  const [formAmount, setFormAmount] = useState([{id : 1, isLast : true}])

  const mappedForm = formAmount.map(({id, isLast})=>{
    return <GameInformationForm 
    key={id}
    id={id}
    formAmount={formAmount}
    isLast={isLast}
    setFormAmount={setFormAmount}
    contributeGameData={contributeGameData}
    setContributeGameData={setContributeGameData} 
    />
  })
  return (
    <>
    {mappedForm}
    </>
  )
}

export default GameInformation