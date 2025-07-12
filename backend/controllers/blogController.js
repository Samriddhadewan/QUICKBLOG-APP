import fs from "fs"
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";



export const addBlog = async(req, res)=>{
    try {
        const {title,subTitle, description, category,isPublished} = JSON.parse(req.body.blog)
        const imgFile = req.file;


        // check if all the fields are present 
        if(!title || !description || !category || !isPublished || !subTitle || !imgFile){
            return res.json({success: false, message: "Missing Required Fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        // upload image to image kit 
        const response = await imagekit.upload({
            file : fileBuffer,
            fileName: imageFile.originalName,
            folder: "/blogs"
        })

        // optimize through imagekit URL transformation 
        const optimizeImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, //auto compression
                {format: "webp"}, //convert to modern format 
                {width: "1280"} //width resizing 
            ]
        })


        const image = optimizeImageUrl;

        await Blog.create({title, subTitle, description, category, image, isPublished})

        res.json({success: true, message: "Blog added Successfully"})





    } catch (error) {
        res.json({success:false, message: error.message})
    }
}