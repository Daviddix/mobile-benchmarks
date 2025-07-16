import glowingLogo from "./assets/glowing-logo.svg"
import "./UnderConstruction.css"

function UnderConstruction() {
  return (
    <main className="under-construction-main">
        <div className="under-construction-inner">
            <img src={glowingLogo} alt="logo" />
            <h1>A New Version is Coming</h1>
            <p>The new version of Mobile Benchmarks is currently in development and will be launching soon. We're working to bring you improved devices, more games, better design and a refined experience. Thank you for your patience—stay tuned</p>
        </div>
    </main>
  )
}

export default UnderConstruction