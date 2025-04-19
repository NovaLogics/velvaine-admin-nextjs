"use client";
import { DataTable } from "@/components/custom_ui/DataTable";
import Loader from "@/components/custom_ui/Loader";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const orders = await response.json();
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error in Orders[GET]: ", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5 w-full">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Orders;
