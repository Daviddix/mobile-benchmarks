import "./PhoneInformation.css"

function PhoneInformation() {
  return (
    <>
    <form className="contribute-phone-form">
                <div>
                    <label htmlFor="phone-name">Phone Name</label>
                    <input type="text" name="phone-name" id="phone-name" placeholder='Samsung Galaxy A15' />
                </div>

                <div className='two-input'>
                    <label htmlFor="storage">Storage Variant</label>

                    <div>
                    <input 
                    id="storage"
                    type="number" placeholder='RAM' />

                    <input type="number" placeholder='ROM' />    
                    </div>
                </div>
            </form>

            <button className="next">Next</button>
    </>
  )
}

export default PhoneInformation