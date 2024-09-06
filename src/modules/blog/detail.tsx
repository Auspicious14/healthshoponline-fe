import React from "react";
import { Typography } from "antd";
import { IBlog } from "./model";
import { ApImage } from "../../components";
import Avatar from "../../../public/images/user chat image.webp";
import { formatDate } from "../../helper";

const { Text } = Typography;

interface IProps {
  blog: IBlog;
}

const BlogDetail: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 md:mt-28 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog?.title}</h1>

      <div className="flex items-center justify-between text-gray-600 text-sm mb-6">
        <div className="flex items-center space-x-2">
          <ApImage
            src={Avatar.src}
            alt={blog?.author?.storeName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">
              {blog?.author?.storeName || "Unknown Author"}
            </p>
            <p className="text-xs">
              Published on {formatDate(blog?.createdAt)}
            </p>
            {blog?.updatedAt && (
              <p className="text-xs text-gray-400">
                Updated on {formatDate(blog?.updatedAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {blog?.images?.length > 0 && (
        <div className="mb-6">
          <ApImage
            src={blog?.images[0]?.uri}
            alt={blog?.images[0]?.name}
            className="w-full  h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg text-gray-700 leading-relaxed">
        {blog?.description}
      </div>

      <div className="mt-10">
        <a
          href={`store/${blog?.author?._id}/blog`}
          className="text-primary hover:underline text-lg font-medium"
        >
          Read More Blogs by {blog?.author?.storeName}
        </a>
      </div>
    </div>
  );
};

export default BlogDetail;
