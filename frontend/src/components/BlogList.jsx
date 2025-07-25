import { useState } from "react";
import { blog_data, blogCategories } from "../assets/assets";
import BlogCard from "./BlogCard";
import { motion } from "motion/react";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const {blogs, input} = useAppContext();

  const filteredBlogs = ()=>{
    if(input === ""){
      return blogs;
    }
    return blogs.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || 
    blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`text-gray-500 cursor-pointer ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}

              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute bg-primary h-7 left-0 right-0 top-0 rounded-full -z-1 "
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 mt-8">
        {/* ---- BLOG CARDS HERE ----- */}
        {
            filteredBlogs().filter((blog)=> menu ==="All"? true : blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog} />)
        }
    </div>
    </div>
  );
};

export default BlogList;
