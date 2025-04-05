"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom_ui/Delete"

export const columns: ColumnDef<CollectionType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <p>{row.original.title}</p>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({ row }) => <p>{row.original.products?.length || 0}</p>
    },
    {
      id: "actions",
      cell: ({ row }) => <Delete/>
    },
  ]