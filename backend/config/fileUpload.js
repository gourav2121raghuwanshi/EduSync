const cloudinary = require('cloudinary').v2


const supportedTypes = ["jpg", "png", "jpeg", "webp"];
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {
        folder: folder,
    };
    if (quality) {
        options.quality = quality;
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

exports.uploadImage = async (req, res)=>{
    const options = {
        folder: "images1",
    };
    const file = s
    try { 
        const result = await cloudinary.uploader.upload(
            file,
            options,
        )
    }catch(error){
        console.log(error);
    }
}


exports.imageUpload = async (req, res) => {

    console.log("in");
    try {
        const file = req.files.imageFile;
        console.log(file);

        const fileType = file.name.split('.').pop().toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }
        console.log(fileType);

       const response = await uploadFileToCloudinary(file, "gourav");

        console.log("Response is", response);

    
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image successfully uploaded",
        });

    } catch (err) {
        console.error(err)
        console.error(err);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
};







