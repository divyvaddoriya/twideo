import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, res , cb){
        cb(null , './public/temp')
    },
    // u can here add unique file name here in cb function 
    filename: function (req, file, cb) {
    cb(null, file.originalname)
  } 
})

export const upload = multer({storage: storage})