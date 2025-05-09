import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

function generateuuid() {
  return crypto.randomUUID().replaceAll("-", "");
}

async function createUser(
  name: string,
  email: string,
  password: string,
  role: "admin" | "superadmin" | "user" | undefined
) {
  const context = await auth.$context;
  const now = new Date();
  const hashed = await context.password.hash(password);
  return await prisma.user.create({
    data: {
      email,
      createdAt: now,
      emailVerified: true,
      name,
      role,
      updatedAt: now,
      accounts: {
        create: {
          providerId: "credential",
          accountId: generateuuid(),
          createdAt: now,
          updatedAt: now,
          password: hashed,
        },
      },
    },
  });
}

async function main() {
  const res = await prisma.project.findMany();
  console.log(res);
  await createUser("Admin", "admin@gmail.com", "password", "admin");
  const user1 = await createUser("User", "user1@gmail.com", "password", "user");
  const user2 = await createUser("User", "user2@gmail.com", "password", "user");
  const user3 = await createUser("User", "user3@gmail.com", "password", "user");
  const user4 = await createUser("User", "user4@gmail.com", "password", "user");
  const user5 = await createUser("User", "user5@gmail.com", "password", "user");
  const user6 = await createUser("User", "user6@gmail.com", "password", "user");

  await prisma.department.create({
    data: {
      name: "IT",
      users: {
        connect: [user1, user2, user3, user4].map((a) => ({ id: a.id })),
      },
    },
  });

  await prisma.department.create({
    data: {
      name: "ESPORTS",
      users: {
        connect: [user4, user5, user3, user6].map((a) => ({ id: a.id })),
      },
    },
  });

  // await prisma.project.create({
  //   data: {
  //       name : "HRM",
  //       description : "Hello",
  //       groups : {
  //           create :[ {
  //               description : "Pending",
  //               name : "Pending",
  //               tasks : {
  //                 create : {

  //                 }
  //               }
  //           }]
  //       }
  //     users: {
  //       connect: [user4, user5, user3, user6].map((a) => ({ id: a.id })),
  //     },
  //   },
  // });
}

main();
