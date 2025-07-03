type populatesUserInfoType = {
      _id : string;
      username : string;
}

type storageSizeType = {
      androidSize : number,
      iosSize : number
}

  type Requirements = {
    operatingSystem: string;
    processor: string;
    gpu: string;
    ram: number;
    storageSize: {
      androidSize : number,
      iosSize: number
    };
    additionalFeatures: string;
  };

  type GameRequirements = {
    minimumRequirements: Requirements;
    recommendedRequirements: Requirements;
  };
  
  type MoreInfo = {
    supportedDevices : popularPhoneInfo[];
    similarGames : Game[];
    gameRequirements: GameRequirements;
    gameScreenshots?: string[]; // Optional array of strings
  };
  
  type gameData = {
      _id : string;
    gameName: string;
    gameCategory: string;
    gameSize: storageSizeType;
    gamePlatform: string;
    gameCoverImage: string;
    gameDescription: string;
    gameYearOfRelease: number;
    gameRating: [number, number]; // Tuple with exactly 2 numbers
    androidDownloadLink: string;
    iosDownloadLink: string;
    moreInfo: MoreInfo;
  };

  type phoneMoreInfo = {
      generalCompatibility : number;
      gpu : string;
      averageRating : [string, string];
      geekBench : number;
      anTutu : number;
      threeDMark : number
  }

  type phoneData = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: [string, string];
    phoneMemory: [number, number];
    moreInfo : phoneMoreInfo
}

type userInfo = {
  username : string | null;
  _id : string | null;
  loading : boolean;
  error : boolean;
}