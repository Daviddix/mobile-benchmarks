import {atom, useAtom} from "jotai"  

type itemsToView = "Phones" | "Games"

type searchingStates = true | false

export const searchAtom = atom<string>("")

export const allPopularPhonesAtom = atom<phoneData[]>([])

export const allPopularGamesAtom = atom<gameData[]>([])

export const filteredPhonesAtom = atom<phoneData[]>([])

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

export const showUserOnlyModalAtom = atom(false)