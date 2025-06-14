export const asyncHandler = (fn) => (req , res , next) => {
 Promise.resolve(fn(req,res,next)).catch((error) => next(error))
}

// if u dont understand  this use chatgot'