import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FileStack, 
  BarChart3, 
  Mail,
  LogOut 
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: FileText, label: "Content", path: "/admin/content" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: FileStack, label: "Pages", path: "/admin/pages" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Mail, label: "Contacts", path: "/admin/contacts" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <div className="container flex gap-6 py-6">
        <aside className="w-64 shrink-0">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};
