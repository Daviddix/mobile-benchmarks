import { useState } from "react";
import "./AddNewPhone.css";
import pictureIcon from "./assets/icons/picture-icon.svg"


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

  const [imageUrl, setImageUrl] = useState("")
  const [phoneUrl, setPhoneUrl] = useState("")
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


              <input type="url" id="scrape" name="scrape" placeholder="https://" />

             <button type="button">Scrape</button>

          </div>

          <div>
            <label htmlFor="phone-name">Phone Name</label>


              <input type="text" id="phone-name" name="phone-name" placeholder="Samsung Galaxy A15 4G" />

          </div>

          <div>
            <label htmlFor="phone-cpu">Phone CPU</label>


              <input type="text" name="phone-cpu" placeholder="Helio G99" />

          </div>

          <div className="two-input">
            <label htmlFor="phone-display">Phone Display</label>


              <div className="two-input-containers">
                <input type="number" id="phone-display" name="phone-display" placeholder="1080" />
                <input type="number" name="phone-display-refresh" placeholder="90" />
              </div>

          </div>

          <div className="two-input">
            <label htmlFor="phone-memory">Phone Memory</label>


              <div className="two-input-containers">
                <input type="number" id="phone-memory" name="phone-memory" placeholder="4" />
                <input type="number" name="phone-memory-refresh" placeholder="128" />
              </div>

          </div>

          <div>
            <label htmlFor="phone-chipset">Phone General Compatibility</label>


              <input type="number" name="phone-general-compatibility" id="phone-general-compatibility" placeholder="79" />

          </div>

          <div>
            <label htmlFor="phone-gpu">Phone GPU</label>


              <input type="text" id="phone-gpu" name="phone-gpu" placeholder="Mali G125" />

          </div>

          <div className="two-input">
            <label htmlFor="phone-rating">Phone Average Rating</label>


              <div className="two-input-containers">
                <input type="number" name="phone-rating" placeholder="4.3" />
                <input type="number" name="phone-rating-count" placeholder="300000" />
              </div>

          </div>

          <div className="two-input three">
            <label htmlFor="phone-benchmarks">Phone Benchmarks</label>


              <div className="three-input-containers">
                <input type="text" name="phone-benchmarks-geekbench" placeholder="Geekbench" />
                <input type="text" name="phone-memory-benchmark-antutu" placeholder="AnTuTu" />
                <input type="text" name="phone-memory-benchmark-threedmark" placeholder="ThreeDMark" />
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
