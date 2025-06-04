import { useState } from "react";
import "./GameInformationForm.css"
import pictureIcon from "../../assets/icons/picture-icon.svg";
import plusIcon from "../../assets/icons/plus-icon.svg";

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
    setFormAmount : React.Dispatch<React.SetStateAction<{
      id: number;
      isLast: boolean;
  }[]>>
  isLast : boolean
  };
  
  type TupleKeys = 'gameFps' | 'gameFrameRate' | 'gameGraphics';

function GameInformationForm({
  contributeGameData,
  setContributeGameData,
  setFormAmount,
  isLast
}: gameInformationProps) {
  const [gameInformationData, setGameInformationData] =
    useState<gameInformationDataType>({
      gameName: "",
      gameBatteryDrain: 0,
      gameFps: [0, ""],
      gameFrameRate: ["", ""],
      gameGraphics: ["", ""],
      gameCompatibility: 1,
    });

    const [gameInformationError, setGameInformationError] = useState("");

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        key: TupleKeys
      ) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setGameInformationData((prev) => ({
              ...prev,
              [key]: [prev[key][0], reader.result as string],
            }));
          };
          reader.readAsDataURL(file);
        }
      };
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const target = e.target as HTMLDivElement;
            const key = target.id as TupleKeys;
            setGameInformationData((prev) => ({
              ...prev,
              [key]: [prev[key][0], reader.result as string],
            }));
          };
          reader.readAsDataURL(file);
        }
      };
    
    const handleClick = (fileInputId: string) => {
        document.getElementById(fileInputId)?.click();
      };

    function addNewForm(){
      setFormAmount((prev)=>{
        prev.forEach((oldObj)=> oldObj.isLast = false)
        const newObj = {id : prev.length+1, isLast : true}
        return [...prev, newObj]
      })
    }

  return (
    <form className="contribute-game-form">
      <div>
        <label htmlFor="game-name">Game Name</label>

        <input
          onChange={(e) => {
            setGameInformationData((prev) => ({
              ...prev,
              [e.target.name]: e.target.value,
            }));
          }}
          value={gameInformationData.gameName}
          name="gameName"
          type="text"
          id="game-name"
          placeholder="Super Mario"
        />
      </div>

      <div>
        <label htmlFor="game-fps">Game FPS</label>

        <div className="bigger-input">
          <input
            type="number"
            onChange={(e) => {
              setGameInformationData((prev) => ({
                ...prev,
                [e.target.name]: [
                  e.target.valueAsNumber,
                  gameInformationData.gameFps[1],
                ],
              }));
            }}
            value={gameInformationData.gameFps[0]}
            name="gameFps"
            placeholder="60"
            id="game-fps"
          />

          <div
            style={{
              backgroundImage: `url(${gameInformationData.gameFps[1]}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              handleClick("fileInputFps");
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            id="gameFps"
            className="attach"
          >
            {!gameInformationData.gameFps[1] && (
              <>
                <img src={pictureIcon} alt="image icon" />

                <p>
                  Attach a screenshot showing a gameplay with the FPS count
                  showing
                </p>
              </>
            )}

            <input
              id="fileInputFps"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameFps");
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="game-frame-rate">Game Frame Rate</label>

        <div className="bigger-input">
          <input
            onChange={(e) => {
              setGameInformationData((prev) => ({
                ...prev,
                [e.target.name]: [
                  e.target.value,
                  gameInformationData.gameFrameRate[1],
                ],
              }));
            }}
            value={gameInformationData.gameFrameRate[0]}
            name="gameFrameRate"
            type="text"
            placeholder="Medium"
            id="game-frame-rate"
          />

          <div
            style={{
              backgroundImage: `url(${gameInformationData.gameFrameRate[1]}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              handleClick("fileInputFrameRate");
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            id="gameFrameRate"
            className="attach"
          >
            {!gameInformationData.gameFrameRate[1] && (
              <>
                <img src={pictureIcon} alt="image icon" />

                <p>
                  Attach a screenshot showing a gameplay with the Frame Rate you
                  played on
                </p>
              </>
            )}

            <input
              id="fileInputFrameRate"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameFrameRate");
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="game-graphics">Game Graphics</label>

        <div className="bigger-input">
          <input
          onChange={(e) => {
            setGameInformationData((prev) => ({
              ...prev,
              [e.target.name]: [
                e.target.value,
                gameInformationData.gameGraphics[1],
              ],
            }));
          }}
          value={gameInformationData.gameGraphics[0]}
          name="gameGraphics"
            type="text"
            placeholder="Ultra"
            id="game-graphics"
          />

          <div
           style={{
            backgroundImage: `url(${gameInformationData.gameGraphics[1]}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => {
            handleClick("fileInputGraphics");
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          id="gameGraphics"
          className="attach">
            {
              !gameInformationData.gameGraphics[1] && (
                <>
            <img src={pictureIcon} alt="image icon" />

            <p>
              Attach a screenshot showing the Graphics Settings you played on
            </p>
                
                </>
              )}

<input
              id="fileInputGraphics"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameGraphics");
              }} />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="battery-drain">
          Game Battery Drain <small>(% per hr)</small>
        </label>

        <input 
        value={gameInformationData.gameBatteryDrain}
        onChange={(e)=>{
          setGameInformationData((prev)=>({
            ...prev,
            [e.target.name]: e.target.valueAsNumber
          }))
        }}
        name="gameBatteryDrain"
        type="number" 
        placeholder="60" 
        min={1} 
        max={90} />
      </div>

      <div>
        <label htmlFor="general">General Compatibility</label>

        <small>{gameInformationData.gameCompatibility}</small>

        <input 
        id="general" 
        value={gameInformationData.gameCompatibility}
        onChange={(e)=>{
          setGameInformationData((prev)=>({
            ...prev,
            [e.target.name]: e.target.valueAsNumber
          }))
        }}
        name="gameCompatibility"
        type="range" />
      </div>

      {isLast?
      <>
      <button 
      onClick={()=>{
        addNewForm()
      }}
      type="button" className="more-games">
        <img src={plusIcon} alt="plus icon" /> Add More Games
      </button>

      <button className="primary">Submit</button>
      </>
      :
      <hr />
      }
    </form>
  )
}

export default GameInformationForm