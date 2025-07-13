import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Blog from "../models/Blog.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    // check if all the fields are present
    if (
      !title ||
      !description ||
      !category ||
      !isPublished ||
      !subTitle ||
      !imageFile
    ) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);

    // upload image to image kit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // optimize through imagekit URL transformation
    const optimizeImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //auto compression
        { format: "webp" }, //convert to modern format
        { width: "1280" }, //width resizing
      ],
    });

    const image = optimizeImageUrl;

    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    res.json({ success: true, message: "Blog added Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async(req, res)=>{
  try {
    const Blogs = Blog.find({isPublished: true})
    res.json({success: true, Blogs})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const getBlogById = async(req, res)=>{
  try {
    const {blogId} = req.parse;
    const blog = await Blog.findById(blogId);
    if(!blog){
     return res.json({success:false, message:"Blog Not Found"})
    }
    res.json({success:true, blog})
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const deleteBlogById = async (req, res)=>{
  try {
    const {id} = req.body;
    await Blog.findByIdAndDelete(id)
    res.json({success: true, message:"Blog Deleted Successfully"})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}

export const togglePublish = async(req,res)=>{
  try {
    const {id} = req.body;
    const blog = await Blog.findById(id)
    blog.isPublished = !isPublished;
    await blog.save();
    res.json({success:true, message:"Successfully Published The Blog"})
  } catch (error) {
    res.json({success:false, message:error.message})
  }
}