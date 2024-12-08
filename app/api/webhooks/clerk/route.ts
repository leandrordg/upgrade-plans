import { headers } from "next/headers";

import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { db } from "@/lib/db";
import { PlanType } from "@prisma/client";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
      const newUserEmail = evt.data.email_addresses.find(
        (email) => email.id === evt.data.primary_email_address_id
      )?.email_address;

      const newUserPhone = evt.data.phone_numbers.find(
        (phone) => phone.id === evt.data.primary_phone_number_id
      )?.phone_number;

      await db.user.create({
        data: {
          id,
          firstName: evt.data.first_name as string,
          lastName: evt.data.last_name || "",
          username: evt.data.username as string,
          email: newUserEmail as string,
          phone: newUserPhone as string,
          image: evt.data.image_url as string,
          createdAt: new Date(evt.data.created_at),
          updatedAt: new Date(evt.data.updated_at),
          activePlan: "FREE" as PlanType,
        },
      });
      break;
    case "user.updated":
      const updatedUserEmail = evt.data.email_addresses.find(
        (email) => email.id === evt.data.primary_email_address_id
      )?.email_address;

      const updatedUserPhone = evt.data.phone_numbers.find(
        (phone) => phone.id === evt.data.primary_phone_number_id
      )?.phone_number;

      await db.user.update({
        where: {
          id,
        },
        data: {
          firstName: evt.data.first_name as string,
          lastName: evt.data.last_name || "",
          username: evt.data.username as string,
          email: updatedUserEmail as string,
          phone: updatedUserPhone as string,
          image: evt.data.image_url as string,
          updatedAt: new Date(evt.data.updated_at),
        },
      });
      break;
    case "user.deleted":
      await db.user.delete({
        where: {
          id,
        },
      });
      break;
  }

  return new Response("Webhook received", { status: 200 });
}
