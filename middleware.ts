import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Initialize the lightweight SSR Server Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set({ name, value, ...options })
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set({ name, value, ...options })
          );
        },
      },
    }
  );

  // 2. Safely unpack the current user identity state
  const { data: { user } } = await supabase.auth.getUser();

  // 3. Handle Protected Route Gatekeeping
  const isUrlAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isUrlLoginRoute = request.nextUrl.pathname.startsWith("/login");

  // If trying to access admin files without a valid session, boot to login
  if (isUrlAdminRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a valid session exists and user goes back to login page, send to dashboard
  if (isUrlLoginRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

// Ensure middleware only intercepts backend routes and control pages
export const config = {
  matcher: ["/admin/:path*", "/login"],
};