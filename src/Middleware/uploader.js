const multer  = require('multer');
const path = require("path");


const storage = multer.diskStorage({
    destination: 'uploads/',

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  

const maxSize = 1 * 1024 * 1024 //1mb
const upload = multer({
    
    storage,
    fileFilter: (req, file, cb) =>{
        const supportedImage = /png|jpg|JPG|PNG|jpeg|pdf/;
        const extension = path.extname(file.originalname);

        if(supportedImage.test(extension)){
            cb(null, true);
        }else{
            cb(new Error("Must be a PNG or JPG image"));
        }

    },
    // limits: {fileSize: maxSize}

});

module.exports = upload;