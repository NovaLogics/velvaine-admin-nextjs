import Customer from "../models/Customer";
import Order from "../models/Order";
import { connectToDB } from "../mongodb";

export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find();

  const totalOrders = orders?.length;

  const totalRevanue = orders?.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  return { totalOrders, totalRevanue };
};

export const getTotalCustomers = async () => {
  await connectToDB();
  const customers = await Customer.find();
  const totalCustomers = customers?.length;

  return totalCustomers;
};

export const getSalesPerMonth = async () => {
  await connectToDB();
  const orders = await Order.find();

  const salesPerMonth = orders?.reduce((accumulator, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); //0[JAN] --> 11[DEC]
    accumulator[monthIndex] =
      (accumulator[monthIndex] || 0) + order.totalAmount;
      return accumulator;
  }, {});

  const graphData = Array.from({ length: 12 }, (_, index) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, index)
    );
    return { name: month, sales: salesPerMonth[index] || 0 };
  });

  return graphData;
};
