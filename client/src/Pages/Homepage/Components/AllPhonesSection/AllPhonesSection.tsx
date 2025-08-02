import  { useEffect, useState } from 'react'
import "./AllPhonesSection.css"
import AllPhonesLoaderSkeleton from './Components/AllPhonesLoaderSkeleton/AllPhonesLoaderSkeleton'
import { useAtom, useAtomValue } from 'jotai'
import { allPopularPhonesAtom, filteredPhonesAtom, headerSearchStatusAtom, searchingState, popularPhonesCacheAtom } from '../../../../globals/states'
import SinglePhone from '../SinglePhone/SinglePhone'
import ErrorComponent from '../../../../Components/ErrorComponent/ErrorComponent'
import RequestItem from '../RequestItem/RequestItem'

function AllPhonesSection() {
  type fetchingStateType = "loading" | "error" | "completed"

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")

  const [isSearching, setIsSearching] = useAtom(searchingState)

  const [allPopularPhones, setAllPopularPhones] = useAtom(allPopularPhonesAtom)

  const [filteredPhones, setAllFilteredPhones] = useAtom(filteredPhonesAtom)
  const headerSearchStatus = useAtomValue(headerSearchStatusAtom)
  
  // Cache atom for storing phones data with timestamp
  const [phonesCache, setPhonesCache] = useAtom(popularPhonesCacheAtom)

  // Cache duration: 5 minutes in milliseconds
  const CACHE_DURATION = 5 * 60 * 1000



  const mappedPopularPhones = allPopularPhones.map(({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName})=>{
    return <SinglePhone
    _id={_id}
    key={_id}
    phoneChipset={phoneChipset}
    phoneCoverImage={phoneCoverImage}
    phoneDisplay={phoneDisplay}
    phoneMemory={phoneMemory}
    phoneName={phoneName}
    />
  })

  const mappedFilteredPhones = filteredPhones.map(({_id, phoneChipset, phoneCoverImage, phoneDisplay, phoneMemory, phoneName})=>{
    return <SinglePhone
    _id={_id}
    key={_id}
    phoneChipset={phoneChipset}
    phoneCoverImage={phoneCoverImage}
    phoneDisplay={phoneDisplay}
    phoneMemory={phoneMemory}
    phoneName={phoneName}
    />
  })

  // Check if cached data is still valid (not older than 5 minutes)
  function isCacheValid(): boolean {
    if (!phonesCache) return false
    const now = Date.now()
    return (now - phonesCache.timestamp) < CACHE_DURATION
  }

  // Load phones from cache or fetch from API
  async function loadPopularPhones() {
    // Check cache first
    if (isCacheValid() && phonesCache) {
      setAllPopularPhones(phonesCache.data)
      setFetchingState("completed")
      return
    }

    // If no valid cache, fetch from API
    await getPopularPhones()
  }

  async function getPopularPhones(){
    try{
      const rawFetch = await fetch("https://mobile-benchmarks.onrender.com/api/phone/get-all")
      const responseInJson : phoneData[] = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      
      // Update both the state and cache
      setAllPopularPhones(responseInJson)
      setPhonesCache({
        data: responseInJson,
        timestamp: Date.now()
      })
      setFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setFetchingState("error")
    }
  }

  useEffect(() => {  
    loadPopularPhones()
  }, [])


  return (
    <div className="popular-phones">
    {fetchingState !== "error" &&  <h2>Popular Phones</h2>}

    <div className={fetchingState == "error"? "all-phones-container error" : "all-phones-container"}>
    {
      fetchingState == "loading"?
      <AllPhonesLoaderSkeleton />
      :
      fetchingState == "error"?
      <ErrorComponent 
                    errorHeading="An Error Occurred"
                    errorMessage="Oops! We couldn’t load popular phones. Please check your connection and try again. If you feel it isn't caused by your internet connection, click the retry button"
                    refreshFunction={getPopularPhones}
                     />
      :
      isSearching ?
      mappedFilteredPhones.length == 0 ?
      <RequestItem 
      itemType='Phone'
      />
        :
                      headerSearchStatus == "searching" ? 
                      <AllPhonesLoaderSkeleton />   
                          : 
                          mappedFilteredPhones
                          :
                          mappedPopularPhones
    }
    </div>
</div>
)}

export default AllPhonesSection