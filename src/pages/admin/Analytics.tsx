import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

const Analytics = () => {
  const metrics = [
    { title: "Total Visits", value: "0", change: "+0%", icon: Eye },
    { title: "Unique Visitors", value: "0", change: "+0%", icon: Users },
    { title: "Page Views", value: "0", change: "+0%", icon: BarChart3 },
    { title: "Bounce Rate", value: "0%", change: "-0%", icon: TrendingUp },
  ];

  const topPages = [
    { page: "/", views: 0 },
    { page: "/about", views: 0 },
    { page: "/services", views: 0 },
    { page: "/contact", views: 0 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Analytics</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">{metric.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page) => (
                <div key={page.page} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{page.page}</span>
                  <span className="text-sm text-muted-foreground">{page.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analytics data is currently simulated. Connect to a real analytics service like Google Analytics or implement custom tracking to see actual visitor data.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
