import { NextResponse } from "next/server";
import { userDashboardData } from "@/lib/dashboard/user";

export function GET() {
  return NextResponse.json({ data: userDashboardData });
}
