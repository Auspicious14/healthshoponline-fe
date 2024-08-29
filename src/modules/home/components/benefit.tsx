import { Typography } from "antd";

const { Text } = Typography;

interface IProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Benefit: React.FC<IProps> = ({ icon, title, description }) => (
  <div className="mb-4">
    {icon}
    <Text className="font-bold mb-1">{title}</Text>
    <Text className="text-gray-500">{description}</Text>
  </div>
);
