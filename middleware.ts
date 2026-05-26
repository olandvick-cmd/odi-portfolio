import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)
            ?.value;
        },

        set(
          name: string,
          value: string,
          options
        ) {
          request.cookies.set({
            name,
            value,
            ...options,
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          response.cookies.set({
            name,
            value,
            ...options,
          });
        },

        remove(name: string, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // IMPORTANT:
  // Refreshes auth session properly
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Optional debug logs
  console.log("Middleware User:", user?.email);
  console.log("Middleware Error:", error);

  const pathname =
    request.nextUrl.pathname;

  const isAdminRoute =
    pathname.startsWith("/admin");

  const isLoginRoute =
    pathname === "/login";

  // Protect admin routes
  if (isAdminRoute && !user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Prevent logged-in users
  // from visiting login page
  if (isLoginRoute && user) {
    return NextResponse.redirect(
      new URL("/admin", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};