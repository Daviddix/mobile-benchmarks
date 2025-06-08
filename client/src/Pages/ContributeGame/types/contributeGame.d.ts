type gameInformationDataType = {
    gameName: string;
    gameFps: [number | undefined, string];
    gameFrameRate: [string, string];
    gameGraphics: [string, string];
    gameBatteryDrain: number | undefined;
    gameCompatibility: number | undefined;
  };

type contributeGameDataType = {
    phoneInfo : {
      phoneName : string;
      phoneRam : number;
      phoneRom : number;
    };
    gameInfo : gameInformationDataType[]
  }