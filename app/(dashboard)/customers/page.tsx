import { DataTable } from "@/components/custom_ui/DataTable";
import { columns } from "@/components/customers/CustomerColumns";
import { Separator } from "@/components/ui/separator";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongodb";
import React from "react";

const Customers = async () => {
  await connectToDB();

  const customers = await Customer.find().sort({ createdAt: -1 });
  return (
    <div className="px-10 py-5 w-full">
      <p className="text-heading2-bold">Customers</p>
      <Separator className="bg-grey-1 my-5" />

      <DataTable columns={columns} data={customers} searchKey="name"/>
    </div>
  );
};

export default Customers;
