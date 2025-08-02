type submittedGameInfo = {
  gameName: string;
  gameFps: [number, string];
  gameFrameRate: string[];
  gameGraphics: string[];
  gameBatteryDrain: number; 
  gameCompatibility: number; 
}

type submittedPhoneInfo = {
    phoneName : string;
    phoneRam : number;
    phoneRom : number;
}

type submissionData = {
    _id : string;
    gameInfo: submittedGameInfo[];
    phoneInfo: submittedPhoneInfo;
    userInfo: populatesUserInfoType;
}