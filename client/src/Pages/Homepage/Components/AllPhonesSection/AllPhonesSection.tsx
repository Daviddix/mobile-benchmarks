import  { useEffect, useState } from 'react'
import "./AllPhonesSection.css"
import AllPhonesLoaderSkeleton from './Components/AllPhonesLoaderSkeleton/AllPhonesLoaderSkeleton'
import { useAtom } from 'jotai'
import { allPopularPhonesAtom, filteredPhonesAtom, searchingState } from '../../../../globals/states'
import SinglePhone from '../SinglePhone/SinglePhone'
import ErrorComponent from '../../../../Components/ErrorComponent/ErrorComponent'
import RequestItem from '../RequestItem/RequestItem'

function AllPhonesSection() {
  type fetchingStateType = "loading" | "error" | "completed"

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
      const rawFetch = await fetch("http://localhost:3000/api/phone/get-all")
      const responseInJson : phoneData[] = await rawFetch.json()

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
          mappedFilteredPhones
          :
            mappedPopularPhones
    }
    </div>
</div>
)}

export default AllPhonesSection