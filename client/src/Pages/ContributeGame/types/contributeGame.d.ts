type gameInformationDataType = {
    gameName: string;
    gameFps: [number, string];
    gameFrameRate: [string, string];
    gameGraphics: [string, string];
    gameBatteryDrain: number;
    gameCompatibility: number;
  };

type contributeGameDataType = {
    phoneInfo : {
      phoneName : string;
      phoneRam : number;
      phoneRom : number;
    };
    gameInfo : gameInformationDataType[]
  }

