import { useState } from "react";
import "./GameInformation.css";
import pictureIcon from "./assets/icons/picture-icon.svg";
import plusIcon from "./assets/icons/plus-icon.svg";

type contributeGameDataType = {
  phoneInfo: {
    phoneName: string;
    phoneRam: number;
    phoneRom: number;
  };
  gameInfo: {
    gameName: string;
    gameFps: [number, string];
    gmeFrameRate: [number, string];
    gameGraphics: [string, string];
    gameBatteryDrain: number;
    gameCompatibility: number;
  };
};

type gameInformationProps = {
  contributeGameData: contributeGameDataType | {};
  setContributeGameData: React.Dispatch<
    React.SetStateAction<{} | contributeGameDataType>
  >;
};

type gameInformationDataType = {
  gameName: string;
  gameFps: [number, string];
  gmeFrameRate: [number, string];
  gameGraphics: [string, string];
  gameBatteryDrain: number;
  gameCompatibility: number;
};

function GameInformation({
  contributeGameData,
  setContributeGameData,
}: gameInformationProps) {
  const [gameInformationData, setGameInformationData] =
    useState<gameInformationDataType>({
      gameName: "",
      gameBatteryDrain: 0,
      gameFps: [0, ""],
      gmeFrameRate: [0, ""],
      gameGraphics: ["", ""],
      gameCompatibility: 0,
    });
  const [gameInformationError, setGameInformationError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, key : keyof gameInformationDataType) => {
    console.log(gameInformationData[key])
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setGameInformationData((prev) => ({
          ...prev,
          [key]: [gameInformationData[key][0], reader.result as string],
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
        const key = target.id as keyof gameInformationDataType
        setGameInformationData((prev) => ({
          ...prev,
          [key]: [gameInformationData[key][0], reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

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
            onClick={handleClick}
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
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e)=>{
                handleFileChange(e, "gameFps")
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="game-frame-rate">Game Frame Rate</label>

        <div className="bigger-input">
          <input
            type="text"
            placeholder="Medium"
            name="game-frame-rate"
            id="game-frame-rate"
          />

          <div className="attach">
            <img src={pictureIcon} alt="image icon" />

            <p>
              Attach a screenshot showing a gameplay with the Frame Rate you
              played on
            </p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="game-graphics">Game Graphics</label>

        <div className="bigger-input">
          <input
            type="text"
            placeholder="Ultra"
            name="game-graphics"
            id="game-graphics"
          />

          <div className="attach">
            <img src={pictureIcon} alt="image icon" />

            <p>
              Attach a screenshot showing the Graphics Settings you played on
            </p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="battery-drain">
          Game Battery Drain <small>(% per hr)</small>
        </label>

        <input type="number" placeholder="60" min={1} max={90} />
      </div>

      <div>
        <label htmlFor="general">General Compatibility</label>

        <input id="general" type="range" />
      </div>

      <button className="more-games">
        <img src={plusIcon} alt="plus icon" /> Add More Games
      </button>

      <button className="primary">Submit</button>
    </form>
  );
}

export default GameInformation;
