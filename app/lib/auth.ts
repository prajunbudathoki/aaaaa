import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "./prisma";
import { phoneNumberClient } from "better-auth/client/plugins";
import { phoneNumber } from "better-auth/plugins/phone-number";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
    },
    plugins: [
      phoneNumber({
        sendOTP: ({ phoneNumber, code }, request) => {
          console.table({ phoneNumber, code });
        },
      }),
    ],
  },
});
