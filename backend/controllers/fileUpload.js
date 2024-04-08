// const File = require("../models/File");
const cloudinary = require('cloudinary').v2
// LocalFileUpload => Handler Function




// const cloudinary = require('cloudinary'); // Make sure to import the Cloudinary library
const supportedTypes = ["jpg", "png", "jpeg"];
// const supportedTypes2 = ["mp4", "mov"];

// Check if the file type is supported
function isFileTypeSupported(fileType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// // Function to upload a file to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {
        folder: folder, // You can specify a folder in Cloudinary
    };
    if (quality) {
        options.quality = quality;
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        // Handle any potential errors during the upload
        console.error('Cloudinary upload error:', error);
        throw error; // Re-throw the error or handle it according to your application's requirements
    }
}


///////////////////////////////////////////
// Image upload handler
exports.imageUpload = async (req, res) => {
    // const { name, tags, email } = req.body;
    console.log("in");
    try {

        // console.log(name, tags, email);
        // console.log(req.files)
        const file = req.files.imageFile;
        // console.log(file);

        // Validate the data fetched above

        // Fetch file type
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log(fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported",
            });
        }
        console.log(fileType);

        // File format supported , upload in cloudinary
        const response = await uploadFileToCloudinary(file, "gourav");

        // Save entry in DB (This part is commented out in your code)
        console.log("Response is", response);


        // Respond to the client
        res.json(
            response.secure_url
        );

    } catch (err) {
        console.error(err)
        console.error(err);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }

};

