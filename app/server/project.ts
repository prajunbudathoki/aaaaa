import prisma from "@/lib/prisma";
import { createServerFn } from "@tanstack/react-start";

export const createProject = createServerFn({
  method: "POST",
})
  .validator((d: { name: string; description: string }) => d)
  .handler(async ({ data: { name, description } }) => {
    return await prisma.project.create({
      data: {
        name,
        description,
      },
    });
  });

export const getProjects = createServerFn({
  method: "GET",
}).handler(async () => {
  return await prisma.project.findMany();
});

export const deleteProjectById = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    await prisma.project.delete({ where: { id: data } });
  });
export const getProjectById = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    return await prisma.project.findUnique({ where: { id: data } });
  });
