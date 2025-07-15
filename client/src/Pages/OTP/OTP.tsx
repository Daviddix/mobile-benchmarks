import "./OTP.css"

function OTP() {
  return (
    <main className="otp-main">
        <div className="otp-inner">

            <div className="otp-title">
            <h1>Enter Verification Code</h1>
            <p>A verification code has been sent to your email address(en***@gmail.com). Please enter the code below to complete your account setup</p>
            </div>

            <form>
                <div className="otp-input-container">
                <input 
                maxLength={1}
                type="number" 
                name="otp" 
                required
                id="otp"
                max={1}
                 />

                <input 
                type="number" 
                name="otp" 
                id="otp"
                maxLength={1} 
                />

                <input 
                type="number" 
                name="otp" 
                id="otp"
                maxLength={1} 
                />

                <input 
                type="number" 
                name="otp" 
                id="otp"
                maxLength={1} 
                />

                <input type="number" name="otp" id="otp" />

                </div>

                <button>Verify</button>
            </form>

            <p className="otp-expire">Your verification code will expire in <strong>5 Minutes</strong></p>
        </div>
    </main>
  )
}

export default OTP