import "./OTP.css"

function OTP() {
  return (
    <main className="otp-main">
        <div className="otp-inner">
            <h1>Enter Verification Code</h1>
            <p>A verification code has been sent to your email address(en***@gmail.com). Please enter the code below to complete your account setup</p>

            <form>
                <div className="otp-input-container">
                <input type="number" name="otp" id="otp" />
                <input type="number" name="otp" id="otp" />
                <input type="number" name="otp" id="otp" />
                <input type="number" name="otp" id="otp" />
                <input type="number" name="otp" id="otp" />

                </div>

                <button>Verify</button>
            </form>
        </div>
    </main>
  )
}

export default OTP