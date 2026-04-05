import { NextResponse } from "next/server";
import {
  CreateApplicationResponse,
  createApplicationRequestSchema,
} from "@/features/application-form/types";

function makeId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${randomPart}`;
}

export async function POST(request: Request) {
  const rawBody = await request.json();
  const validation = createApplicationRequestSchema.safeParse(rawBody);

  if (!validation.success) {
    const flattened = validation.error.flatten();

    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "The submitted application payload is invalid.",
          fieldErrors: flattened.fieldErrors,
        },
      },
      { status: 400 },
    );
  }

  const response: CreateApplicationResponse = {
    applicationId: makeId("app"),
    customerId: makeId("cus"),
    applicationStatus: "submitted",
    message:
      "Your application has been received successfully. Our team will review your request and contact you using the details provided.",
  };

  return NextResponse.json(response, { status: 201 });
}
