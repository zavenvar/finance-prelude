import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Mail, Eye } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: "Total Users", value: "0", icon: Users },
    { title: "Content Items", value: "6", icon: FileText },
    { title: "Contact Submissions", value: "0", icon: Mail },
    { title: "Page Views", value: "0", icon: Eye },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
