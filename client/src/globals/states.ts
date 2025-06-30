import {atom, useAtom} from "jotai"

//types
type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
}

type storageSizeType = {
      androidSize : number,
      iosSize : number
    }

type gameData = {
    _id : string;
    gameName: string;
    gameCategory: string;
    gameSize: storageSizeType;
    gamePlatform: string;
    gameCoverImage: string;
  }


type userInfo = {
  username : string | null;
  _id : string | null;
  loading : boolean;
  error : boolean;
}  
type itemsToView = "Phones" | "Games"

type searchingStates = true | false

export const searchAtom = atom<string>("")

export const allPopularPhonesAtom = atom<popularPhoneInfo[]>([])

export const allPopularGamesAtom = atom<gameData[]>([])

export const filteredPhonesAtom = atom<popularPhoneInfo[]>([])

export const filteredGamesAtom = atom<gameData[]>([])

export const searchingState = atom<searchingStates>(false)

export const itemsToViewAtom = atom<itemsToView>("Phones")

export const userInfoAtom = atom<userInfo>({
  username : null,
  _id : null,
  loading : true,
  error : false
})

export const isAdminAtom = atom(false)