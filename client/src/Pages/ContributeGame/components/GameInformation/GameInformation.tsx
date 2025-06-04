import { useState } from "react";
import "./GameInformation.css"
import GameInformationForm from './components/GameInformationForm/GameInformationForm'

type gameInformationDataType = {
  gameName: string;
  gameFps: [number, string];
  gameFrameRate: [string, string];
  gameGraphics: [string, string];
  gameBatteryDrain: number;
  gameCompatibility: number;
};

type contributeGameDataType = {
  phoneInfo: {
    phoneName: string;
    phoneRam: number;
    phoneRom: number;
  };
  gameInfo: gameInformationDataType
};

type gameInformationProps = {
  contributeGameData: contributeGameDataType | {};
  setContributeGameData: React.Dispatch<
    React.SetStateAction<{} | contributeGameDataType>
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