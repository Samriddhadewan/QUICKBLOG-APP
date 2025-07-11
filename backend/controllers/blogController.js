export const addBlog = async(req, res)=>{
    try {
        const {title,subTitle, description, category,isPublished} = JSON.parse(req.body.blog)
        const imgFile = req.file;


        // check if all the fields are present 
        if(!title || !description || !category || !isPublished){
            return res.json({success: false, message: "Missing Required Fields"})
        }
    } catch (error) {
        
    }
}