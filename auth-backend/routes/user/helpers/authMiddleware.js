//imports following functions from authMethods.js
const {
  checkIsEmail,
  checkIsAlpha,
  checkIsAlphanumeric,
} = require("../../utils/authMethods");
//creates function that checks if email inserted by user is valid format. if not it will advise of it.
function checkIsEmailFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsEmail(req.body.email)) {
    errorObj.wrongEmailFormat = "Must be in email format!";
  }
  next();
}
//creates function that checks if keys firstName and lastName are in alpha format
function checkIsAlphaFunc(req, res, next) {
  const { errorObj } = res.locals;
  const inComingData = req.body;
  for (key in inComingData) {
    if (key === "firstName" || key === "lastName") {
      if (!checkIsAlpha(inComingData[key])) {
        errorObj[`${key}`] = `${key} can only have characters`;
      }
    }
  }
  next();
}
//creates function that checks if the username that the client uses is not in alphanumeric format, advise so
function checkIsAlphanumericFunc(req, res, next) {
  const { errorObj } = res.locals;
  if (!checkIsAlphanumeric(req.body.username)) {
    errorObj.usernameError = "username can only have characters and numbers";
  }
  next();
}
//exports functions
module.exports = {
  checkIsEmailFunc,
  checkIsAlphaFunc,
  checkIsAlphanumericFunc,
};
