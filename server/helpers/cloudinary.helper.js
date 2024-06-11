const cloudinary = require('../configs/cloudinary.config.js');

const uploadImage = async (imagePath, publicKey) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, { public_id: publicKey });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}

const deleteImage = async (publicKey) => {
    try {
        const result = await cloudinary.uploader.destroy(publicKey);
        return result;
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;
    }
}

const getPublicKeyFromUrl = (url) => {
    try {
        const parsedUrl = new URL(url);

        const pathname = parsedUrl.pathname;

        const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

        const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');

        return fileNameWithoutExtension;
    } catch (error) {
        console.error("Error extracting file name from URL:", error);
        throw error;
    }
}


module.exports = { uploadImage, deleteImage, getPublicKeyFromUrl }