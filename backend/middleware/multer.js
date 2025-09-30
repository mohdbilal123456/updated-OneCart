import multer from "multer";

let storage = multer.diskStorage({
      destination :(req,file,cb)=> {
            cb(null,'./public')
      },
      filename :(req,file,cb)=> {
            cb(null,file.originalname)
      }
})

// Yahan null matlab error = null (sab theek).
// cb callback function hai jo multer ko batata hai ki tumhari custom logic 
// (folder ya filename decide karne ka) complete ho gaya hai.

const upload = multer({storage})

export default upload