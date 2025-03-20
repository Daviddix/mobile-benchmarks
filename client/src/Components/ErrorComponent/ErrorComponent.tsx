import "./ErrorComponent.css"

type allGamesSectionPropsType = {
    refreshFunction : Function;
    errorHeading : string;
    errorMessage : string;
    id? : string;
}

function ErrorComponent({errorHeading, errorMessage, refreshFunction, id} : allGamesSectionPropsType) {
  return (
    <div className="error-container">

        <div className="image-container">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path fill="currentColor" d="M11 7h2v7h-2zm0 8h2v2h-2z"></path><path fill="currentColor" d="m21.707 7.293l-5-5A1 1 0 0 0 16 2H8a1 1 0 0 0-.707.293l-5 5A1 1 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A1 1 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A1 1 0 0 0 22 16V8a1 1 0 0 0-.293-.707M20 15.586L15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414z"></path>
        </svg>

        </div>

        <h1>{errorHeading}</h1>
        
        <p>{errorMessage}</p>

        <button
        onClick={()=>{
            id ? refreshFunction(id) : refreshFunction()
        }}
        >Retry</button>
    </div>
  )
}

export default ErrorComponent