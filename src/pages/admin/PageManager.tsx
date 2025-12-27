import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useSiteContent, DynamicPage } from "@/contexts/SiteContentContext";

const staticPages = [
  { id: "home", name: "Home", path: "/", isStatic: true },
  { id: "about", name: "About", path: "/about", isStatic: true },
  { id: "services", name: "Services", path: "/services", isStatic: true },
  { id: "contact", name: "Contact", path: "/contact", isStatic: true },
  { id: "careers", name: "Careers", path: "/careers", isStatic: true },
];

const PageManager = () => {
  const { content, updateContent } = useSiteContent();
  const [newPage, setNewPage] = useState({ name: "", path: "", content: "" });
  const [editingPage, setEditingPage] = useState<DynamicPage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dynamicPages = content.dynamicPages || [];

  const handleAddPage = () => {
    if (!newPage.name || !newPage.path) {
      toast.error("Please fill in name and path");
      return;
    }

    const pathWithSlash = newPage.path.startsWith("/") ? newPage.path : `/${newPage.path}`;
    
    // Check for duplicate paths
    const allPaths = [...staticPages.map(p => p.path), ...dynamicPages.map(p => p.path)];
    if (allPaths.includes(pathWithSlash)) {
      toast.error("A page with this path already exists");
      return;
    }

    const page: DynamicPage = {
      id: Date.now().toString(),
      name: newPage.name,
      path: pathWithSlash,
      content: newPage.content || `Welcome to ${newPage.name}`,
      status: "Published",
    };

    const updatedContent = {
      ...content,
      dynamicPages: [...dynamicPages, page],
      nav: [...content.nav, { name: page.name, href: page.path }],
    };

    updateContent(updatedContent);
    setNewPage({ name: "", path: "", content: "" });
    toast.success("Page created and added to navigation!");
  };

  const toggleStatus = (id: string) => {
    const updatedPages = dynamicPages.map(page =>
      page.id === id
        ? { ...page, status: page.status === "Published" ? "Draft" as const : "Published" as const }
        : page
    );

    const page = updatedPages.find(p => p.id === id);
    let updatedNav = content.nav;

    if (page) {
      if (page.status === "Published") {
        // Add to nav if not exists
        if (!updatedNav.find(n => n.href === page.path)) {
          updatedNav = [...updatedNav, { name: page.name, href: page.path }];
        }
      } else {
        // Remove from nav
        updatedNav = updatedNav.filter(n => n.href !== page.path);
      }
    }

    updateContent({
      ...content,
      dynamicPages: updatedPages,
      nav: updatedNav,
    });
    toast.success("Page status updated!");
  };

  const handleDeletePage = (id: string) => {
    const page = dynamicPages.find(p => p.id === id);
    const updatedPages = dynamicPages.filter(p => p.id !== id);
    
    let updatedNav = content.nav;
    if (page) {
      updatedNav = updatedNav.filter(n => n.href !== page.path);
    }

    updateContent({
      ...content,
      dynamicPages: updatedPages,
      nav: updatedNav,
    });
    toast.success("Page deleted!");
  };

  const handleEditPage = (page: DynamicPage) => {
    setEditingPage(page);
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingPage) return;

    const updatedPages = dynamicPages.map(page =>
      page.id === editingPage.id ? editingPage : page
    );

    // Update nav if name changed
    const updatedNav = content.nav.map(n =>
      n.href === editingPage.path ? { ...n, name: editingPage.name } : n
    );

    updateContent({
      ...content,
      dynamicPages: updatedPages,
      nav: updatedNav,
    });

    setIsDialogOpen(false);
    setEditingPage(null);
    toast.success("Page updated!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Page Management</h2>

        <Card>
          <CardHeader>
            <CardTitle>Create New Page</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Page Name</Label>
                <Input
                  placeholder="e.g., Test Page"
                  value={newPage.name}
                  onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Path</Label>
                <Input
                  placeholder="e.g., /test"
                  value={newPage.path}
                  onChange={(e) => setNewPage({ ...newPage, path: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Page Content</Label>
              <Textarea
                placeholder="Enter the page content..."
                value={newPage.content}
                onChange={(e) => setNewPage({ ...newPage, content: e.target.value })}
                rows={4}
              />
            </div>
            <Button onClick={handleAddPage}>Create Page</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Static Pages (Built-in)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staticPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>{page.name}</TableCell>
                    <TableCell>{page.path}</TableCell>
                    <TableCell>
                      <Badge>Published</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dynamic Pages</CardTitle>
          </CardHeader>
          <CardContent>
            {dynamicPages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No dynamic pages created yet. Create one above!
              </p>
            ) : (
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
                  {dynamicPages.map((page) => (
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
                          onClick={() => handleEditPage(page)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(page.id)}
                        >
                          {page.status === "Published" ? "Unpublish" : "Publish"}
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
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Page</DialogTitle>
            </DialogHeader>
            {editingPage && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Page Name</Label>
                  <Input
                    value={editingPage.name}
                    onChange={(e) => setEditingPage({ ...editingPage, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    value={editingPage.content}
                    onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                    rows={6}
                  />
                </div>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default PageManager;
