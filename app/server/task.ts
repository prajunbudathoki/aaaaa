import prisma from "@/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const createTask = createServerFn({
  method: "POST",
})
  .validator((d: { name: string; description: string; projectId: string }) => d)
  .handler(async ({ data: { name, description, projectId } }) => {
    return await prisma.task.create({
      data: {
        title: name,
        description,
        projectId,
      },
    });
  });


  export const getTasksByProject = createServerFn({
    method: "POST",
  })
    .validator((d: { projectId: string }) => d)
    .handler(async ({ data: { projectId} }) => {
      return await prisma.task.findMany({
        where: {
          projectId,
        },
      });
    });
