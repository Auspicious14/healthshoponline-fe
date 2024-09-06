import React from "react";
import { Typography } from "antd";
import { IBlog } from "./model";
import { ApImage } from "../../components";

const { Text } = Typography;

interface IProps {
  blog: IBlog;
}

export const BlogDetail: React.FC<IProps> = ({ blog }) => {
  return (
    <div className="p-4">
      <Text className="text-xl font-bold">{blog?.title}</Text>
      {blog?.images?.length > 0 && (
        <ApImage src={blog?.images[0]?.uri} alt={blog?.images[0]?.name} />
      )}
      <Text className="text-justify text-primary">{blog?.description}</Text>
    </div>
  );
};
