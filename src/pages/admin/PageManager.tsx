import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Page {
  id: string;
  name: string;
  path: string;
  status: "Published" | "Draft";
}

const PageManager = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: "1", name: "Home", path: "/", status: "Published" },
    { id: "2", name: "About", path: "/about", status: "Published" },
    { id: "3", name: "Services", path: "/services", status: "Published" },
    { id: "4", name: "Contact", path: "/contact", status: "Published" },
    { id: "5", name: "Careers", path: "/careers", status: "Published" },
  ]);

  const [newPage, setNewPage] = useState({ name: "", path: "" });

  const handleAddPage = () => {
    if (!newPage.name || !newPage.path) {
      toast.error("Please fill in all fields");
      return;
    }

    const page: Page = {
      id: Date.now().toString(),
      ...newPage,
      status: "Draft",
    };

    setPages([...pages, page]);
    setNewPage({ name: "", path: "" });
    toast.success("Page added successfully!");
  };

  const toggleStatus = (id: string) => {
    setPages(pages.map(page =>
      page.id === id
        ? { ...page, status: page.status === "Published" ? "Draft" : "Published" }
        : page
    ));
    toast.success("Page status updated!");
  };

  const handleDeletePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
    toast.success("Page deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Page Management</h2>

        <Card>
          <CardHeader>
            <CardTitle>Add New Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Input
                placeholder="Page Name"
                value={newPage.name}
                onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
              />
              <Input
                placeholder="Path (e.g., /new-page)"
                value={newPage.path}
                onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
              />
              <Button onClick={handleAddPage}>Add Page</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pages List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>{page.name}</TableCell>
                    <TableCell>{page.path}</TableCell>
                    <TableCell>
                      <Badge variant={page.status === "Published" ? "default" : "secondary"}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleStatus(page.id)}
                      >
                        Toggle Status
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePage(page.id)}
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

export default PageManager;
