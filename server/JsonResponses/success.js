const userCreated = {
    status : "success",
    type : "User Created",
    message : "A user has successfully been created"
}

const loginSuccessful = {
    status : "success", 
    type : "Login Successful", 
    message : "You have successfully been logged in"
}

const gameSubmitted = {
    status : "success",
    type : "Game Submitted",
    message : "Your game information has been submitted for review. Thank you for your service"
}

const reportSubmitted = {
    status : "success",
    type : "Report Submitted",
    message : "The report you just made has been submitted successfully and will be reviewed. Thank you"
}

const successfullyDeletedItem = {
    status : "success",
    type : "Item Deleted",
    message : "The item has been successfully deleted"
}

const otpSentToUser = {
    status : "success",
    type : "otp sent",
    message : "The OTP has successfully been created and sent to the user email address"
}

module.exports = {userCreated, reportSubmitted, loginSuccessful, gameSubmitted, successfullyDeletedItem, otpSentToUser}