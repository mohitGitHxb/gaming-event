import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/home(.*)", "/events(.*)"]);

const adminProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  if (isProtectedRoute(req)) {
    auth().protect((has) => {
      return has({ role: "admin" });
    });
  }
},{debug: true});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
