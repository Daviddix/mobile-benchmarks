import { useState } from "react";
import "./AddNewPhone.css";
import pictureIcon from "./assets/icons/picture-icon.svg"

type scrapedPhoneInfoType = {
      phoneName : string,
      phoneCPU : string,
      phoneDisplay : [string, string]
      phoneMemory : string,
      phoneGPU : string,
      phoneBenchmarks : string,
      phoneGeneralCompatibility : number
}

//LEAVE FOR NOW, COMPLETE LATER

function AddNewPhone() {
 async function transformImageFromUrl(phoneImageUrl: string): Promise<Blob | undefined> {
  try {
    const response = await fetch("http://localhost:3000/api/phone/transform-image", {
      method: "POST",
      body: JSON.stringify({ imageUrl: phoneImageUrl }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error("Cannot get image from backend");
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Blob([arrayBuffer], { type: "image/png" });

  } catch (error: any) {
    console.error(error);
    alert("An error occurred");
  }
}

async function scrapePhoneInfo(gsmArenaUrl : string) : Promise<scrapedPhoneInfoType | undefined>{
  try {
    const response = await fetch("http://localhost:3000/api/phone/scrape-phone-info", {
      method : "POST",
      headers : {
        "Content-Type" : "Application/json"
      },
      body : JSON.stringify({phoneUrl : gsmArenaUrl}),
      credentials : "include"
    })

    const responseInJson : scrapedPhoneInfoType = await response.json()
    if(!response.ok){
      throw new Error("Couldn't scrape url", {cause : responseInJson})
    }

    // setFormData()
    return responseInJson

  } catch (error : any) {
    console.log(error.message)
  }
}

  const [imageUrl, setImageUrl] = useState("")
  const [phoneUrl, setPhoneUrl] = useState("")
  const [formData, setFormData] = useState<scrapedPhoneInfoType>({
    phoneName : "",
    phoneCPU : "",
    phoneDisplay : ["", ""],
    phoneMemory : "",
    phoneGeneralCompatibility : 0,
    phoneGPU : "",
    // phoneRating : [0, 0],
    phoneBenchmarks : ""
  })

  const [gsmArenaUrl, setGsmArenaUrl] = useState("")
  return (
    <main className="add-new-phone">
      <main className="add-new-phone-inner">
        <div className="add-new-phone-title">
          <p>ADMIN</p>
          <h1>Add a New Phone</h1>
        </div>

        <form className="add-new-phone-form">
          <div>
            <label htmlFor="phone-url">Phone URL</label>

            <div className="bigger-input">
              <input type="url"
              value={phoneUrl}
              onChange={(e)=>{
                setPhoneUrl(e.target.value)
              }}
              id="phone-url" name="phone-url" placeholder="https://" />

              <div
              style={{
                backgroundImage : `url(${imageUrl})`,
                backgroundSize : "cover",
                backgroundPosition : "center"
              }}
              className="attach">
                {

                  !imageUrl && <>
                  <img src={pictureIcon} alt="image icon" />
  
                  <p>Phone Preview</p>
                  
                  </>
                }
              </div>
            </div>

            <button
            disabled={!phoneUrl}
            onClick={async()=>{
              const blob = await transformImageFromUrl(phoneUrl);
            if (!blob) return;
            const srcBlob = URL.createObjectURL(blob);
            setImageUrl(srcBlob);

            }}
            type="button">Transform Image</button>
          </div>

          <div>
            <label htmlFor="scrape">Phone URL to Scrape</label>


              <input value={gsmArenaUrl} onChange={(e)=>setGsmArenaUrl(e.target.value)} type="url" id="scrape" name="scrape" placeholder="https://" />

             <button
             onClick={()=>{
              scrapePhoneInfo(gsmArenaUrl)
             }}
             type="button">Scrape</button>

          </div>

          <div>
            <label htmlFor="phone-name">Phone Name</label>


              <input type="text" 
              onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneName}
              id="phone-name" 
              name="phoneName" 
              placeholder="Samsung Galaxy A15 4G" />

          </div>

          <div>
            <label htmlFor="phone-cpu">Phone CPU</label>


              <input 
              type="text" 
              id="phone-cpu"
              name="phoneCpu"
              onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneCPU}
              placeholder="Helio G99" />

          </div>

          <div className="two-input">
            <label htmlFor="phone-display">Phone Display</label>


              <div className="two-input-containers">
                <input type="number" id="phone-display" name="phoneDisplay"
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneDisplay[0]}
                placeholder="1080" />


                <input type="number" name="phone-display-refresh" 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneDisplay[1]}
                placeholder="90" />
              </div>

          </div>

          <div className="two-input">
            <label htmlFor="phone-memory">Phone Memory</label>


              <div className="two-input-containers">
                <input type="number" id="phone-memory" name="phoneMemory" 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneMemory[0]}
                placeholder="4" 
                />

                <input type="number" 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneMemory[1]}
                name="phoneMemory" placeholder="128" 
                />
              </div>

          </div>

          <div>
            <label htmlFor="phone-chipset">Phone General Compatibility</label>


              <input type="number" name="phoneGeneralCompatibility"
              onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneGeneralCompatibility} id="phone-general-compatibility" 
              placeholder="79" 
              />

          </div>

          <div>
            <label htmlFor="phone-gpu">Phone GPU</label>


              <input type="text" id="phone-gpu" name="phoneGpu"
              onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneGPU}
              placeholder="Mali G125" />

          </div>

          <div className="two-input">
            <label htmlFor="phone-rating">Phone Average Rating</label>


              <div className="two-input-containers">
                <input 
                type="number" name="phoneRating" 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
                placeholder="4.3" />


                <input 
                type="number" name="phoneRating"
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
                placeholder="300000" />
              </div>

          </div>

          <div className="two-input three">
            <label htmlFor="phone-benchmarks">Phone Benchmarks</label>


              <div className="three-input-containers">
                <input 
                type="text" name="phoneBenchmarks" 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneBenchmarks[0]}
                placeholder="Geekbench" />


                <input 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneBenchmarks[1]}
                type="text" name="phone-memory-benchmark-antutu" placeholder="AnTuTu" />


                <input 
                onChange={(e)=>{
                setFormData((prev)=> ({...prev, [e.target.name] : e.target.value}))
              }}
              value={formData.phoneBenchmarks[2]}
                type="text" name="phone-memory-benchmark-threedmark" placeholder="ThreeDMark" />
              </div>

          </div>

          <button className="primary">
            Submit
          </button>
        </form>
      </main>
    </main>
  );
}

export default AddNewPhone;
