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
  email : string | null;
  _id : string | null;
  loading : boolean;
  error : boolean;
}

type GameSubset = Pick<gameData, '_id' | 'gameName' | 'gameCoverImage' | 'gameDescription' | "androidDownloadLink" | "iosDownloadLink">;

type compatibleGame = {
  phone: string;
  compatibleGamesInfo : [
    {
      game : GameSubset;
      gameCompatibilityRating: number;
      gamePerformanceStats : {
        fps: number;
        frameRate: string;
        graphicsQuality: string;
        batteryUsagePerHour: number;
      }
    }
  ]
}