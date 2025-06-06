import { useState } from "react";
import "./GameInformationForm.css";
import pictureIcon from "../../assets/icons/picture-icon.svg";
import plusIcon from "../../assets/icons/plus-icon.svg";
import ErrorText from "./components/ErrorText";

type gameInformationProps = {
  contributeGameData: contributeGameDataType | {};

  setContributeGameData: React.Dispatch<
    React.SetStateAction<{} | contributeGameDataType>
  >;
  setFormAmount: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        isLast: boolean;
      }[]
    >
  >;
  isLast: boolean;
  id : number
};

type TupleKeys = "gameFps" | "gameFrameRate" | "gameGraphics";

type contributeGameDataError = {
  gameNameError? : string;
  gameFpsError? : string;
  gameFrameRateError? : string;
  gameGraphicsError? : string;
  gameBatteryDrainError? : string;
  gameCompatibilityError? : string;
}

function GameInformationForm({
  contributeGameData,
  setContributeGameData,
  setFormAmount,
  isLast,
  id,
}: gameInformationProps) {

  const [gameInformationData, setGameInformationData] =
    useState<gameInformationDataType>({
      gameName: "",
      gameBatteryDrain: undefined,
      gameFps: [undefined, ""],
      gameFrameRate: ["", ""],
      gameGraphics: ["", ""],
      gameCompatibility: undefined,
    });

  const [gameInformationError, setGameInformationError] = useState<contributeGameDataError | null>(null);

  function inputHasErrors(gameData : gameInformationDataType){
    const {gameName, gameFps, gameBatteryDrain, gameCompatibility, gameFrameRate, gameGraphics} = gameData

    const defaultMessage = "An error occurred with the value you entered, please check it and try again"

    if(gameName.trim() == "" || typeof gameName !== "string"){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameNameError : defaultMessage
        }
      })
      return true
    }else if(gameFps[0] == 0 || typeof gameFps[0] !== "number"){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameFpsError : defaultMessage
        }
      })
      return true
    }else if(gameFps[1].trim() == ""){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameFpsError : "Please attach a screenshot showing a gameplay with the FPS count showing"
        }
      })
      return true
    }else if(gameFrameRate[0] == "" || typeof gameFrameRate[0] !== "string"){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameFrameRateError : defaultMessage
        }
      })
      return true
    }else if(gameFrameRate[1].trim() == ""){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameFrameRateError : "Please attach a screenshot showing a gameplay with the frame rate you played on"
        }
      })
      return true
    }else if(gameGraphics[0] == "" || typeof gameGraphics[0] !== "string"){
      setGameInformationError((prev)=>{
        return {
          ...prev,
          gameGraphicsError : defaultMessage
        }
      })
      return true
      }else if(gameGraphics[1].trim() == ""){
        setGameInformationError((prev)=>{
          return {
            ...prev,
            gameGraphicsError : "Please attach a screenshot showing the graphics settings you played on"
          }
        })
        return true
      }else if(gameBatteryDrain == 0 || typeof gameBatteryDrain !== "number"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
            gameBatteryDrainError : defaultMessage
          }
        })
        return true
      }else if(gameCompatibility == 0 || typeof gameCompatibility !== "number"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
            gameCompatibilityError : defaultMessage
          }
        })
        return true
      }else if(gameBatteryDrain < 1 || gameBatteryDrain > 50){
        setGameInformationError((prev)=>{
          return {
            ...prev,
            gameBatteryDrainError : "Battery drain should be between 1 and 50%"
          }
        })
        return true
      }

      return false
  }

  function validateInput(){
    setGameInformationError(null)
    const {gameName, gameFps, gameBatteryDrain, gameCompatibility, gameFrameRate, gameGraphics} = gameInformationData

    const isError = inputHasErrors(gameInformationData)

      if(isError){
        return
      }

      setContributeGameData((prev : any)=>{
        if(prev.gameInfo){
          return {
            ...prev,
            gameInfo: [...(prev.gameInfo), {
              gameName,
              gameFps,
              gameFrameRate,
              gameGraphics,
              gameBatteryDrain,
              gameCompatibility,
            }]
          };
        }else{
          return {
            ...prev,
            gameInfo: [{
              gameName,
              gameFps,
              gameFrameRate,
              gameGraphics,
              gameBatteryDrain,
              gameCompatibility,
            }]
          }
        }
      })
  }

  function validateInputBeforeAddingNewGameSection(){
    setGameInformationError(null)
    const {gameName, gameFps, gameBatteryDrain, gameCompatibility, gameFrameRate, gameGraphics} = gameInformationData

    const isError = inputHasErrors(gameInformationData)

      if(isError){
        return
      }

    setContributeGameData((prev : any)=>{
      if(prev.gameInfo){
        return {
          ...prev,
          gameInfo: [...(prev.gameInfo), {
            gameName,
            gameFps,
            gameFrameRate,
            gameGraphics,
            gameBatteryDrain,
            gameCompatibility,
          }]
        };
      }else{
        return {
          ...prev,
          gameInfo: [{
            gameName,
            gameFps,
            gameFrameRate,
            gameGraphics,
            gameBatteryDrain,
            gameCompatibility,
          }]
        }
      }
    })

    addNewForm()
    return
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: TupleKeys
  ) => {
    setGameInformationError(null)
    const file = event.target.files?.[0];
    if (!file) return 

    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

    const sizeErrorMessage = "oops, seems like the screenshot you selected is too large, You can try compressing it before uploading"

    if (file.size > maxSizeInBytes) {
      if(key == "gameFrameRate"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameFrameRateError : sizeErrorMessage
          }
        })
      }else if(key == "gameFps"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameFpsError : sizeErrorMessage
          }
        })
      }else if(key == "gameGraphics"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameGraphicsError : sizeErrorMessage
          }
        })
      }
      
    }else{
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
    setGameInformationError(null)
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    const target = e.target as HTMLDivElement;
    const key = target.id as TupleKeys;

    if (!file) return 

    const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

    const sizeErrorMessage = "oops, seems like the screenshot you selected is too large, You can try compressing it before uploading"

    if (file.size > maxSizeInBytes) {
      if(key == "gameFrameRate"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameFrameRateError : sizeErrorMessage
          }
        })
      }else if(key == "gameFps"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameFpsError : sizeErrorMessage
          }
        })
      }else if(key == "gameGraphics"){
        setGameInformationError((prev)=>{
          return {
            ...prev,
           gameGraphicsError : sizeErrorMessage
          }
        })
      }
      
    }else{
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

  const handleClick = (fileInputId: string) => {
    document.getElementById(fileInputId)?.click();
  };

  function addNewForm() {
    setFormAmount((prev) => {
      const newPrev = prev
      newPrev.forEach((oldObj) => (oldObj.isLast = false));
      const newObj = { id: newPrev.length + 1, isLast: true };
      return [...newPrev, newObj];
    });
  }

  return (
    <form className="contribute-game-form">
      <div>
        <label htmlFor="game-name">Game Name</label>

        <input
          onChange={(e) => {
            setGameInformationError(null)
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
          minLength={1}
        />
        {gameInformationError?.gameNameError && <ErrorText error={gameInformationError?.gameNameError} />}
      </div>

      <div>
        <label htmlFor="game-fps">Game FPS</label>

        <div className="bigger-input">
          <input
            type="number"
            onChange={(e) => {
              setGameInformationError(null)
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
              handleClick("fileInputFps"+id);
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
              id={"fileInputFps"+id}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameFps");
              }}
            />
          </div>
        </div>

        {gameInformationError?.gameFpsError && <ErrorText error={gameInformationError?.gameFpsError} />}
      </div>

      <div>
        <label htmlFor="game-frame-rate">Game Frame Rate</label>

        <div className="bigger-input">
          <input
            onChange={(e) => {
              setGameInformationError(null)
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
              handleClick("fileInputFrameRate"+id);
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
              id={"fileInputFrameRate"+id}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameFrameRate");
              }}
            />
          </div>
        </div>

        {gameInformationError?.gameFrameRateError && <ErrorText error={gameInformationError?.gameFrameRateError} />}
      </div>

      <div>
        <label htmlFor="game-graphics">Game Graphics</label>

        <div className="bigger-input">
          <input
            onChange={(e) => {
              setGameInformationError(null)
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
              handleClick("fileInputGraphics"+id);
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            id="gameGraphics"
            className="attach"
          >
            {!gameInformationData.gameGraphics[1] && (
              <>
                <img src={pictureIcon} alt="image icon" />

                <p>
                  Attach a screenshot showing the Graphics Settings you played
                  on
                </p>
              </>
            )}

            <input
              id={"fileInputGraphics"+id}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                handleFileChange(e, "gameGraphics");
              }}
            />
          </div>
        </div>

        {gameInformationError?.gameGraphicsError && <ErrorText error={gameInformationError?.gameGraphicsError} />}
      </div>

      <div>
        <label htmlFor="battery-drain">
          Game Battery Drain <small>(% per hr)</small>
        </label>

        <input
          value={gameInformationData.gameBatteryDrain}
          onChange={(e) => {
            setGameInformationError(null)
            setGameInformationData((prev) => ({
              ...prev,
              [e.target.name]: e.target.valueAsNumber,
            }));
          }}
          name="gameBatteryDrain"
          type="number"
          placeholder="5"
          min={1}
          max={50}
        />

      {gameInformationError?.gameBatteryDrainError && <ErrorText error={gameInformationError?.gameBatteryDrainError} />}
      </div>

      <div>
        <label htmlFor="general">General Compatibility</label>

        <small>{gameInformationData.gameCompatibility ?? "Scroll Slider to set"}</small>

        <input
          id="general"
          value={gameInformationData.gameCompatibility}
          onChange={(e) => {
            setGameInformationError(null)
            setGameInformationData((prev) => ({
              ...prev,
              [e.target.name]: e.target.valueAsNumber,
            }));
          }}
          name="gameCompatibility"
          type="range"
          min={10}
          max={100}
        />

    {gameInformationError?.gameCompatibilityError && <ErrorText error={gameInformationError?.gameCompatibilityError} />}
      </div>

      {isLast ? (
        <>
          <button
            onClick={() => {
              validateInputBeforeAddingNewGameSection()
            }}
            type="button"
            className="more-games"
          >
            <img src={plusIcon} alt="plus icon" /> Add More Games
          </button>

          <button
          onClick={(e)=>{
            e.preventDefault()
            validateInput()
          }}
          className="primary">Submit</button>
        </>
      ) : (
        <hr />
      )}
    </form>
  );
}

export default GameInformationForm;
