import  { useEffect, useState } from 'react'
import "./AllPhonesSection.css"
import AllPhonesLoaderSkeleton from './Components/AllPhonesLoaderSkeleton/AllPhonesLoaderSkeleton'
import { useAtom } from 'jotai'
import { allPopularPhonesAtom, filteredPhonesAtom, searchingState } from '../../../../globals/states'
import SinglePhone from '../SinglePhone/SinglePhone'

function AllPhonesSection() {
  type fetchingStateType = "loading" | "error" | "completed"

  type popularPhoneInfo = {
    _id: string;
    phoneName: string;
    phoneChipset: string;
    phoneCoverImage: string;
    phoneDisplay: string[];
    phoneMemory: number[];
  }

  const [fetchingState, setFetchingState] = useState<fetchingStateType>("loading")

  const [isSearching, setIsSearching] = useAtom(searchingState)

  const [allPopularPhones, setAllPopularPhones] = useAtom(allPopularPhonesAtom)

  const [filteredPhones, setAllFilteredPhones] = useAtom(filteredPhonesAtom)



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

  async function getPopularPhones(){
    try{
      const rawFetch = await fetch("https://mobile-benchmarks.onrender.com/api/phone/get-all")
      const responseInJson : popularPhoneInfo[] = await rawFetch.json()

      if(!rawFetch.ok){
        throw new Error("Fetching Error" , {cause : responseInJson})
      }
      setAllPopularPhones(responseInJson)
      setFetchingState("completed")
    }
    catch(err){
      console.log("An error occurred", err)
      setFetchingState("error")
    }
  }

  useEffect(() => {  
    getPopularPhones()
  }, [])


  return (
    <div className="popular-phones">
    <h2>Popular Phones</h2>

    <div className="all-phones-container">
    {
      fetchingState == "loading"?
      <AllPhonesLoaderSkeleton />
      :
      fetchingState == "error"?
      <div>Error</div>
      :
      isSearching ?
      mappedFilteredPhones.length == 0 ?
      <div>Couldn't find your search</div>
        :
          mappedFilteredPhones
          :
            mappedPopularPhones
    }
    </div>
</div>
)}

export default AllPhonesSection