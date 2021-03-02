const errors = { 
    FAILED_LOGIN: "Email and password unmatch.", 
    INVALID_EMAIL: "Email address is invalid",
    INCOMPLETE_FIELDS: "Please make sure you fill up fields completely",
    INCORRECT_FIELDS: "Please make sure you fill up fields correctly",
    PASSWORDS_UNMATCH: "Password and Confirm Password must match",
    EMAIL_EXISTS: "Email already taken." 
}

const user_path = {
    ON_SESSION: "/wall",
    OFF_SESSION: "/login"
}

module.exports = {errors, user_path};