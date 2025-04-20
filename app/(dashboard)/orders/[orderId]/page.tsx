import { DataTable } from "@/components/custom_ui/DataTable";
import { columns } from "@/components/order_items/OrderItemColumns";
import React from "react";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const { orderId } = await params;
  const response = await fetch(
    `${process.env.ADMIN_BASE_URL}/api/orders/${orderId}`
  );

  const { orderDetails, customer } = await response.json();

  const { line1, line2, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>

      <p className="text-base-bold">
        Customer Name: <span className="text-base-medium">{customer.name}</span>
      </p>

      <p className="text-base-bold">
        Shipping Address:{" "}
        <span className="text-base-medium">
          {line1 || ""}, {line2 ? line2 + ", " : ""}
          {city}, {postalCode}, {country}
        </span>
      </p>

      <p className="text-base-bold">
        Total Paid:{" "}
        <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>

      <p className="text-base-bold">
        Shipping Rate ID:{" "}
        <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>

      <DataTable columns={columns} data={orderDetails.products} searchKey="product"/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default OrderDetails;
