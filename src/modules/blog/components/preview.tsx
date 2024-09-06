import React from "react";
import { IBlog } from "../model";
import { ApImage } from "../../../components";
import { Typography } from "antd";
import moment from "moment";

const { Text } = Typography;

interface IProps {
  blog: IBlog;
  onClick: () => void;
}

export const BlogPreview: React.FC<IProps> = ({ blog, onClick }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options as any);
  };

  return (
    <div
      className="cursor-pointer border border-gray-200 rounded-lg shadow-sm transition-transform hover:shadow-lg hover:scale-105"
      onClick={onClick}
    >
      {blog?.images?.length > 0 ? (
        <img
          src={blog?.images[0]?.uri}
          alt={blog?.images[0]?.name}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <div className="p-4">
        <p className="text-xl font-semibold text-gray-800">{blog?.title}</p>

        <p className="text-xs text-gray-500 mt-1">
          <span className="text-primary">
            By {blog?.author?.storeName || "Unknown Author"} &bull;
          </span>
          | Published on {formatDate(blog?.createdAt)}
        </p>

        <p className="text-sm text-gray-600 mt-3">
          {blog?.description?.length < 100
            ? blog?.description
            : `${blog?.description.slice(0, 100)}...`}
        </p>
      </div>
    </div>
  );
};
