import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  // Middleware already handled authentication, so we can safely get the session
  const session = await auth();
  
  // Since middleware guarantees authentication, session will always exist here
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userSession = session!;
  
  // Return health check data with user info
  return NextResponse.json(
    { 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      user: {
        id: userSession.user.id,
        name: userSession.user.name,
        email: userSession.user.email
      }
    },
    { status: 200 }
  );
}
