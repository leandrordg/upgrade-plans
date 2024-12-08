import { db } from "@/lib/db";

export const getAllPlans = async () => {
  return await db.plan.findMany({
    include: {
      features: true,
    },
    orderBy: {
      price: "asc",
    },
  });
};
