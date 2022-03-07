const { checkIsEmpty } = require("../../utils/authMethods");

function checkIsEmptyFunc(req, res, next) {
  let inComingData = req.body;
  const { errorObj } = res.locals;
  for (let key in inComingData) {
    if (checkIsEmpty(inComingData[key])) {
      errorObj[key] = `${key} cannot be empty`;
    }
  }
  next();
}
//export function
module.exports = checkIsEmptyFunc;
