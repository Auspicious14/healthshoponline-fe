import React from 'react'
import { IOrder } from './model'
import { Space, Typography } from 'antd'
import moment from 'moment'

const  {Text} = Typography
interface IProps {
    order: IOrder
}
export const OrderDetailPage: React.FC<IProps> = ({order}) => {
  return (
    <div className='flex justify-center items-center border rounded-md'>
        <Space className='flex justify-between items-center border-b'>
            <Text>Order ID</Text>
            <Text className='font-bold'>{order?.id}</Text>
        </Space>
        <Space className='flex justify-between items-center border-b'>
            <Text>Transaction Date</Text>
            <Text className='font-bold'>{moment(order?.createdAt).format('DD-MM-YYYY')}</Text>
        </Space>
        <Space className='flex justify-between items-center border-b'>
            <Text>Address</Text>
            <Text>{order?.address?.address}</Text>
        </Space>
        <Text>Your Order</Text>
        
    </div>
  )
}
