import {atom, useAtom} from "jotai"  

type itemsToView = "Phones" | "Games"

type searchingStates = true | false

type headerSearchStatusType = "searching" | "error" | "completed"

// Cache types for storing data with timestamps
type CacheData<T> = {
  data: T;
  timestamp: number;
} | null

export const searchAtom = atom<string>("")

export const allPopularPhonesAtom = atom<phoneData[]>([])

// Cache atom for popular phones with 5-minute stale time
export const popularPhonesCacheAtom = atom<CacheData<phoneData[]>>(null)

export const allPopularGamesAtom = atom<gameData[]>([])

// Cache atom for popular games with 5-minute stale time
export const popularGamesCacheAtom = atom<CacheData<gameData[]>>(null)

export const filteredPhonesAtom = atom<phoneData[]>([])

export const filteredGamesAtom = atom<gameData[]>([])

export const searchingState = atom<searchingStates>(false)

export const itemsToViewAtom = atom<itemsToView>("Phones")

export const userInfoAtom = atom<userInfo>({
  username : null,
  email : null,
  _id : null,
  loading : true,
  error : false
})

export const isAdminAtom = atom(false)

export const showUserOnlyModalAtom = atom(false)

export const headerSearchStatusAtom = atom<headerSearchStatusType>("completed")