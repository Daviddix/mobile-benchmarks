const duplicateUsername = {
    status : "error",
    type : "Duplicate Username",
    message : "Seems like the username you tried to use has already been taken. Please try another one"
}

const duplicateEmail = {
    status : "error",
    type : "Duplicate Email",
    message : "Seems like the email you tried to use has already been taken. Please try another one"
}

const noBodyDataError = {
    status : "error",
    type : "Missing Data",
    message : "Seems like the one or more data fields are missing. Please make sure all fields are filled before submitting"
}

const unknownError = {
    status : "error",
    type : "Unknown Error",
    message : "Seems like an error occurred while we were trying to process your request. Please try again later"
}

const googleTokenError = {
    status : "error",
    type : "Missing Token",
    message : "Seems like an error occurred while we were trying to create your account. Please try again later"
}

const jwtTokenError = {
    status : "error",
    type : "JWT error",
    message : "Seems like an error occurred while we were trying to work with your JWT token"
}

const noJwtToken = {
    status : "error",
    type : "no JWT",
    message : "Seems like a JWT token wasn't provided"
}

const userNotFoundInDataBase = {
    status : "error",
    type : "user not found",
    message : "This user cannot be found in the database"
}

const switchToGoogleAccount = {
    status : "error",
    type : "login error",
    message : "Seems like a google account already exists with that email, try logging in with Google"
}
module.exports = {duplicateUsername, duplicateEmail, noBodyDataError, unknownError, googleTokenError, userNotFoundInDataBase, jwtTokenError, noJwtToken, switchToGoogleAccount}