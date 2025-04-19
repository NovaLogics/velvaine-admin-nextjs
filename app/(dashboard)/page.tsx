import SalesChart from "@/components/custom_ui/SalesChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

export default async function Home() {
  const totalRevenue = await getTotalSales().then((res) => res.totalRevanue);
  const totalOrders = await getTotalSales().then((res) => res.totalOrders);
  const totalCustomers = await getTotalCustomers();
  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10 w-full">
      <p className="text-heading2-bold font-semibold">Dashboard</p>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold font-bold">$ {totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold font-bold">{totalOrders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Total Customers</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold font-bold">{totalCustomers}</p>
          </CardContent>
        </Card>

      </div>

      <Card className="mt-10">
          <CardHeader >
            <CardTitle>Sales Chart ($)</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesChart data={graphData}/>
          </CardContent>
        </Card>
    </div>
  );
}
