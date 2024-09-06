import React from "react";
import { IBlog } from "../model";
import { ApImage } from "../../../components";
import { Typography } from "antd";
import Link from "next/link";
import { formatDate } from "../../../helper";

const { Text } = Typography;

interface IProps {
  blog: IBlog;
}

export const BlogPreview: React.FC<IProps> = ({ blog }) => {
  return (
    <Link
      href={`/stores/${blog?.author?._id}/blog/${blog?._id}`}
      className="cursor-pointer border border-gray-200 rounded-lg shadow-sm transition-transform hover:shadow-lg hover:scale-105"
    >
      {blog?.images?.length > 0 ? (
        <ApImage
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
    </Link>
  );
};
