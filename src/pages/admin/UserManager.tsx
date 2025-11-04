import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Admin User", email: "admin@example.com", role: "Admin", status: "Active" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Please fill in all fields");
      return;
    }

    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "Active",
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", role: "User" });
    toast.success("User added successfully!");
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success("User deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">User Management</h2>

        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              <Button onClick={handleAddUser}>Add User</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManager;
