import { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import BlockTable from "../../components/admin/BlockTable";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const {axios} = useAppContext();


  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get("/api/admin/blogs")
      if(data.success){
        setBlogs(data.blogs)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div className="flex-1 px-5 py-5 sm:pt-10 sm:pl-16 bg-blue-50/50 ">
      <p>All Blogs</p>

      <div className="relative mt-4 max-w-4xl h-4/5 overflow-x-auto shadow rounded-lg scrollbar-hide bg-white ">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 tex-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Status
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              return (
                <BlockTable
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
