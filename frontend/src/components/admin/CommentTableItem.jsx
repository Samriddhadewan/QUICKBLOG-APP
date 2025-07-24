import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const CommentTableItem = ({ comment, fetchComments }) => {
  const {axios} = useAppContext();
  
  const { blog, createdAt, _id } = comment;
  const blogDate = new Date(createdAt);

  const handleApprove = async()=>{
    try {
      const {data} = await axios.post("/api/admin/approve-comment", {id: _id})
      if(data.success){
        toast.success(data.message)
        fetchComments();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteComment = async()=>{
    try {
      const {data} = await axios.post("/api/admin/delete-comment", {id: _id})
      if(data.success){
        toast.success(data.message)
        fetchComments();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4"> 
        <b className="font-medium text-gray-600">Blog</b> :{blog?.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> :{comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {blogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-3 p-4">
          {!comment.isApproved ? (
            <img
              onClick={handleApprove}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            onClick={handleDeleteComment}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
