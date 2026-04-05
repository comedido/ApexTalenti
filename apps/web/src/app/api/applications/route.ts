import { NextResponse } from "next/server";
import {
  CreateApplicationRequest,
  CreateApplicationResponse,
} from "@/features/application-form/types";

function makeId(prefix: string) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${randomPart}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateApplicationRequest;

  if (!body?.application?.brandName || !body?.customer?.primaryContactEmail) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Missing required application fields.",
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
      "Your application has been received successfully. This is still a local placeholder backend.",
  };

  return NextResponse.json(response, { status: 201 });
}
