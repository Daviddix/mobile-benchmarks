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

type searchingStates = true | false

export const searchAtom = atom<string>("")
export const allPopularPhonesAtom = atom<popularPhoneInfo[]>([])
export const filteredPhonesAtom = atom<popularPhoneInfo[]>([])
export const searchingState = atom<searchingStates>(false)