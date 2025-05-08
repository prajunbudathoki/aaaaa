import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import { phoneNumber } from "better-auth/plugins/phone-number";
import prisma from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin", "superadmin"],
    }),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        console.table({ phoneNumber, code });
      },
    }),
  ],
});
