import {atom} from "jotai"

//types
type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
}

type gameData = {
    _id : string;
    gameName: string;
    gameCategory: string;
    gameSize: number;
    gamePlatform: string;
    gameCoverImage: string;
  }

type itemsToView = "Phones" | "Games"

type searchingStates = true | false

export const searchAtom = atom<string>("")

export const allPopularPhonesAtom = atom<popularPhoneInfo[]>([])

export const allPopularGamesAtom = atom<gameData[]>([])

export const filteredPhonesAtom = atom<popularPhoneInfo[]>([])

export const searchingState = atom<searchingStates>(false)

export const itemsToViewAtom = atom<itemsToView>("Phones")