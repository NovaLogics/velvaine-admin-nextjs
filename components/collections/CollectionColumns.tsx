"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom_ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => 
      <Link href={`/collections/${row.original._id}`}>
        <p className="hover:text-blue-1">{row.original.title}</p>
      </Link>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => <p>{row.original.products?.length || 0}</p>
    },
    {
      id: "actions",
      cell: ({ row }) => <Delete id={row.original._id} item="collection"/>
    },
  ]