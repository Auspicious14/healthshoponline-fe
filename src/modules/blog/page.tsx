import React, { useEffect } from "react";
import { useBlogState } from "./context";
import { BlogPreview } from "./components/preview";

interface IProps {
  storeId: string;
}

export const BlogPage: React.FC<IProps> = ({ storeId }) => {
  const { getBlogs, blogs } = useBlogState();

  useEffect(() => {
    getBlogs(storeId);
  }, [storeId]);

  return (
    <div className="mx-20 mt-32 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {blogs?.map((b) => (
          <BlogPreview blog={b} key={b?._id} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};
