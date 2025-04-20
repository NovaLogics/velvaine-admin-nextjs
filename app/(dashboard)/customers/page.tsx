import { DataTable } from "@/components/custom_ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongodb";
import React from "react";

const Customers = async () => {
  await connectToDB();

  //const customers = await Customer.find().sort({ createdAt: "desc" });
  const rawCustomers = await Customer.find().sort({ createdAt: "desc" });

  // Convert Mongoose documents to plain JS objects
  const customers = rawCustomers.map(customer => ({
    _id: customer._id.toString(),
    clerkId: customer.clerkId,
    name: customer.name,
    email: customer.email,
    createdAt: customer.createdAt.toISOString(),
  }));
  return (
    <div className="px-10 py-5 w-full">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />

      <DataTable columns={columns} data={customers} searchKey="name"/>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
