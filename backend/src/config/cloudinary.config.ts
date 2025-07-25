export const cloudinary = ()=>({
    cloudinary:{

        config:{

                name: process.env.CLOUDINARY_NAME,
                apiKey: process.env.CLOUDINARY_API_KEY,
                apiSecret: process.env.CLOUDINARY_API_SECRET,
    
            },
        folder: process.env.CLOUDINARY_STORAGE_FOLDER
    }
})

export interface CloudinaryConfig {
    name: string,
    apiKey: string,
    apiSecret: string
} 