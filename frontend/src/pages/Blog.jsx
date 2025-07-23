import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, blog_data, comments_data } from "../assets/assets";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import moment from "moment";
import Footer from "../components/Footer";
import { useAppContext } from "../context/appContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/getBlogComments", {
        blogId: id,
      });
      console.log(data);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name: name,
        content: comment,
      });
      if (data.success) {
        toast.success(data.message);
        setComment("")
        setName("")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-50"
      />
      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-primary my-6 font-medium">
          Publish on {moment(data.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p className="text-2xl sm:text-5xl max-w-2xl font-semibold text-gray-600 mx-auto">
          {data.title}
        </p>
        <p className="my-4 max-w-lg truncate mx-auto">{data.subTitle}</p>
        <p className="bg-primary/5 border-primary/35 py-1 px-4 rounded-full text-sm font-medium inline-block text-primary border mb-6">
          Samriddha dewan
        </p>
      </div>

      <div className="mx-5 my-10 mt-6 max-w-5xl md:mx-auto">
        <img src={data.image} alt="" className="rounded-3xl mb-5" />

        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments section  */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p>Comments ({comments.length})</p>
          <div className="flex flex-col gap-4 my-5">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p>{comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">
                  {comment.content}
                  <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                    {moment(comment.createdAt).fromNow()}
                  </div>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* comment section  */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">Add Your comment</p>
          <form onClick={addComment} className="flex flex-col gap-4 mx-w-lg">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              id=""
              className="w-full p-2 border border-gray-300 rounded outline-none"
              placeholder="Enter Your name"
            />

            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              placeholder="Enter Your comment"
              name=""
              id=""
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
            ></textarea>

            <button
              type="submit"
              className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Add Your comment
            </button>
          </form>
        </div>

        {/* social share icons  */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share This Article in social media
          </p>
          <div className="flex">
            <img src={assets.facebook_icon} width={45} alt="" />
            <img src={assets.twitter_icon} width={45} alt="" />
            <img src={assets.googleplus_icon} width={45} alt="" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Blog;
