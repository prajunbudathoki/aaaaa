import prisma from "@/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const createGroup = createServerFn({
  method: "POST",
})
  .validator((d: { name: string; description: string; projectId: string }) => d)
  .handler(async ({ data: { name, description, projectId } }) => {
    return await prisma.projectGroup.create({
      data: {
        name,
        description,
        projectId,
      },
    });
  });
export const getGroupsByProject = createServerFn({
  method: "POST",
})
  .validator((d: { projectId: string }) => d)
  .handler(async ({ data: { projectId } }) => {
    return await prisma.projectGroup.findMany({
      where: {
        projectId,
      },
    });
  });
