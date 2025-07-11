import { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { option } from "motion/react-client";

const AddBlog = () => {

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState("Startup")
  const [isPublished, setIsPublished] = useState(false);


  const generateContent = async()=>{

  }
  const onSubmitHanlder = async(e)=>{
    e.preventDefault();
  }


  useEffect(()=>{
    // initial quill only once 
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: "snow"})  
    }
  },[])


  return (
    <form className="flex-1 bg-blue-50/50 text=gray-600 h-full overflow-scroll">
      <div className="bg-white w-full max-w-3xl p-5 md:p-10 sm:m-10 shadow rounded">
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image? assets.upload_area : URL.createObjectURL(image)} alt="" className="mt-2 h-16 rounded cursor-pointer" />
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

      
        <p className="mt-4">Blog Title</p>
        <input type="text" required className="w-full max-w-lg p-2 mt-2 border border-gray-300 outline-none rounded" name="" id=""  
        onChange={e=> setTitle(e.target.value)} value={title} placeholder="Enter Title" />
      
        <p className="mt-4">Blog Sub Title</p>
        <input type="text" required className="w-full max-w-lg p-2 mt-2 border border-gray-300 outline-none rounded" name="" id=""  
        onChange={e=> setSubTitle(e.target.value)} value={subTitle} placeholder="Enter Subtitle" />
        
        <p className="mt-4">Blog Sub Title</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}>

          </div>
          <button className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 round hover:underline cursor-pointer" type="button" onClick={generateContent}>Generate With AI</button>
        </div>

        <p className="mt-4">Blog Category</p>
        <select onChange={e=> setCategory(e.target.value)} name="category" className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none round">
          <option value="">Select Category</option>
          {
            blogCategories.map((item, idx)=> {
              return <option value={item} key={idx}>{item}</option>
            })
          }
        </select>


        <div className="flex gap-3 mt-4">
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} className="scale-125 cursor-pointer" onChange={e=> setIsPublished(e.target.checked)} />
        </div>

          <button type="submit" className="mt-8 w-40 h-10 bg-primary text-white round cursor-pointer text-sm">Add Blog</button>


      </div>
    </form>
  );
};

export default AddBlog;
