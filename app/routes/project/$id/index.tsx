import { useAppForm } from "@/components/inputs/form-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectGroup, Task } from "@/generated/prisma";
import { createGroup, getGroupsByProject } from "@/server/group";
import { getProjectById } from "@/server/project";
import { createTask, getTasksByProject } from "@/server/task";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/project/$id/")({
  component: RouteComponent,
  async loader({ params }) {
    const res = await getProjectById({ data: params.id });
    if (!res) {
      throw notFound();
    }
    const groups = await getGroupsByProject({ data: { projectId: params.id } });
    const tasks = await getTasksByProject({ data: { projectId: params.id } });

    return {
      project: res,
      groups,
      tasks,
    };
  },
});

function RouteComponent() {
  const { project, groups, tasks } = Route.useLoaderData();

  const todoTasks = tasks.filter(
    (task) => task.projectGroupId == null && !task.completed
  );
  const completedTasks = tasks.filter(
    (task) => task.projectGroupId == null && task.completed
  );

  return (
    <div className="my-4 mx-2 space-y-4">
      <CreateGroup projectId={project.id} />
      <CreateTask projectId={project.id} />
      <div className="flex gap-2 w-full">
        <GroupCard
          isDefaultCard={true}
          isCompleted={false}
          tasks={todoTasks}
          projectId={project.id}
        />
        {groups.map((g) => (
          <GroupCard
            key={g.id}
            isDefaultCard={false}
            group={g}
            tasks={tasks.filter((t) => t.projectGroupId === g.id)}
          />
        ))}
        <GroupCard
          isDefaultCard={true}
          isCompleted={true}
          tasks={completedTasks}
          projectId={project.id}
        />
      </div>
    </div>
  );
}

function CreateGroup({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
    },
    async onSubmit({ formApi, value }) {
      await createGroup({
        data: {
          ...value,
          projectId,
        },
      });
      await router.invalidate();
      formApi.reset();
      setOpen(false);
    },
  });

  return (
    <form.AppForm>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Group</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create a New Group
            </DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt, quasi?
            </DialogDescription>
          </DialogHeader>
          <form.AppField
            name="name"
            children={(field) => <field.TextField label="Name" />}
          />
          <form.AppField
            name="description"
            children={(field) => <field.TextAreaField label="Description" />}
          />
          <DialogFooter>
            <form.SubmitButton label="Create Group" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form.AppForm>
  );
}
function CreateTask({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const form = useAppForm({
    defaultValues: {
      name: "",
      description: "",
    },
    async onSubmit({ formApi, value }) {
      await createTask({
        data: {
          ...value,
          projectId,
        },
      });
      await router.invalidate();
      formApi.reset();
      setOpen(false);
    },
  });

  return (
    <form.AppForm>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create Task</Button>
        </DialogTrigger>
        <DialogContent>
          <form.AppField
            name="name"
            children={(field) => <field.TextField label="Name" />}
          />
          <form.AppField
            name="description"
            children={(field) => <field.TextAreaField label="Description" />}
          />
          <DialogFooter>
            <form.SubmitButton label="Create Task" />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form.AppForm>
  );
}
function GroupCard(
  props:
    | {
        isDefaultCard: false;
        group: ProjectGroup;
        tasks: Task[];
      }
    | {
        isDefaultCard: true;
        isCompleted: boolean;
        tasks: Task[];
        projectId: string;
      }
) {
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>
          {props.isDefaultCard
            ? props.isCompleted
              ? "Completed"
              : "TODO"
            : props.group.name}
        </CardTitle>
        <CardDescription>
          {props.isDefaultCard
            ? props.isCompleted
              ? "Tasks that are comppleted"
              : "Tasks yet to be done"
            : props.group.description}
        </CardDescription>
      </CardHeader>
      <div>
        {props.tasks.length === 0 ? (
          <p>No tasks</p>
        ) : (
          props.tasks.map((task) => (
            <div key={task.id}>
              <p className="font-medium">{task.title}</p>
              <p>{task.description}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
