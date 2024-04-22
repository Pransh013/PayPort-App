"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const createOnRampTransaction = async (
  amount: number,
  provider: string
) => {
  const session = await getServerSession(authOptions);
  const userId = Number(session.user.id);

  if (!userId)
    return {
      message: "User not logged in",
    };

  const token = Math.random().toString();
  const onRampTransaction = await prisma.onRampTransaction.create({
    data: {
      userId,
      startTime: new Date(),
      status: "Processing",
      amount,
      provider: provider,
      token,
    },
  });
  return {
    message: "onramp transaction added",
  };
};
