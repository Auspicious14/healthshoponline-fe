import { Typography } from "antd";

const { Text } = Typography;

interface IProps {
  label: string;
  value: string | number;
}

export const Statistic: React.FC<IProps> = ({ label, value }) => (
  <div>
    <Text className="text-2xl font-bold text-primary">{value}</Text>
    <Text className="text-gray-500">{label}</Text>
  </div>
);
