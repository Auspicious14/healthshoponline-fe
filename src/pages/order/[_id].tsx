import React from "react";
import { OrderDetailPage } from "../../modules/order/detail";
import { IOrder } from "../../modules/order/model";
import { apiReqHandler } from "../../components";

interface IProps {
  order: IOrder;
}
const OrderDetail: React.FC<IProps> = ({ order }) => {
  return <OrderDetailPage order={order} />;
};

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  if (!req?.cookies.user_id) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }

  const { _id } = query;
  const data = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/order/${_id}`,
    method: "GET",
  });
  const order = data?.res?.data?.data;
  if (!order) return new Error("Unauthorised");
  return {
    props: { order },
  };
};

export default OrderDetail;
