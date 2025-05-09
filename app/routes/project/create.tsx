import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import {
  createProject,
  deleteProjectById,
  getProjects,
} from "@/server/project";
import { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Trash } from "lucide-react";

export const Route = createFileRoute('/project/create')({
  component: RouteComponent,
  loader: async () => getProjects()
})

function RouteComponent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const projects = Route.useLoaderData();
  return (
    <div className="space-y-4 my-4 container mx-auto">
    <div className="container mx-auto space-y-2">
      {error && (
        <Alert variant={"destructive"}>
          <AlertTitle>Error</AlertTitle>\
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Enter details below to create a project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <CardAction>
            <Button
              onClick={() => {
                createProject({ data: { description, name } })
                  .then(() => {
                    router.invalidate();
                  })
                  .catch((e) => {
                    setDescription(e.message || "An Error Occured");
                  });
              }}
            >
              Create
            </Button>
          </CardAction>
        </CardContent>
      </Card>
    </div>

    <h1 className="text-lg font-bold">Projects</h1>
    <div className="grid md:grid-cols-2 gap-2">
      {projects.map((p) => {
        return (
          <Card>
            <div className="flex items-center">
              <CardHeader className="w-full">
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <div className="flex gap-2 mr-4">
                <Button asChild size={"icon"}>
                  <Link to="/project/$id" params={{ id: p.id }}>
                    <Eye />
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    deleteProjectById({ data: p.id }).then(() =>
                      router.invalidate()
                    );
                  }}
                  size={"icon"}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
  )
}
