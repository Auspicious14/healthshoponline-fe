import { Typography } from "antd";

const { Text } = Typography;

interface IProps {
  title: string;
  icon: React.ReactNode;
}
export const Feature: React.FC<IProps> = ({ icon, title }) => (
  <div className="flex gap-4 items-center sm:w-1/4 border-r-2">
    <div className="bg-white rounded-md p-2">{icon}</div>
    <Text className="font-bold text-xl">{title}</Text>
  </div>
);
