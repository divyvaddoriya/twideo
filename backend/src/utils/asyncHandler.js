export const asyncHandler = (fn) =>{ 
   return  (req , res , next) => {
         Promise.resolve(fn(req,res,next)).catch((error) => next(error))
}
}
// if u dont understand  this use chatgot'