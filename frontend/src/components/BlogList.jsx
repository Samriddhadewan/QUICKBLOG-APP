import { blogCategories } from "../assets/assets";

const BlogList = () => {
  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button>{item}</button>
          </div>
        ))}
      </div>

      <div>
        {/* ---- BLOG CARDS HERE ----- */}
    </div>
    </div>
  );
};

export default BlogList;
