"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order (ID)",
    cell: ({ row }) => (
      <Link href={`/orders/${row.original._id}`}>
        <p className="hover:text-blue-1">{row.original._id}</p>
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
