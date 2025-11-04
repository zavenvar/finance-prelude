import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Replied";
}

const ContactManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sample Contact",
      email: "sample@example.com",
      subject: "General Inquiry",
      message: "This is a sample contact submission.",
      date: new Date().toLocaleDateString(),
      status: "New",
    },
  ]);

  const updateStatus = (id: string, status: Contact["status"]) => {
    setContacts(contacts.map(contact =>
      contact.id === id ? { ...contact, status } : contact
    ));
    toast.success("Status updated successfully!");
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success("Contact deleted successfully!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Contact Form Submissions</h2>

        <Card>
          <CardHeader>
            <CardTitle>Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell>{contact.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          contact.status === "New" ? "default" :
                          contact.status === "Read" ? "secondary" : "outline"
                        }
                      >
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(contact.id, "Read")}
                      >
                        Mark Read
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(contact.id, "Replied")}
                      >
                        Mark Replied
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
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

        <Card>
          <CardHeader>
            <CardTitle>Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Contact form submissions are currently stored in browser localStorage. For production use, connect to a backend database to persist submissions across sessions.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ContactManager;
