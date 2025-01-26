"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const breadcrumbMap = {
  "/": ["Feed Home"],
  "/forgot-password": ["Forgot Password"],
  "/login": ["Login"],
  "/posts/create": ["Feed Home", "Create Post"],
  "/posts/[slug]": ["Feed Home", "Post"],
  "/profile": ["Manage Profile"],
  "/reset-password": ["Reset Password"],
  "/signup": ["Sign Up"],
  "/task-manager": ["Task Manager"],
};

function resolveBreadcrumb(pathname) {
  for (const route in breadcrumbMap) {
    // Handle dynamic routes like /post/[slug]
    if (route.includes("[slug]") && pathname.startsWith(route.replace("[slug]", ""))) {
      return [...breadcrumbMap[route.replace("[slug]", "")], "Post"];
    }
    // Handle exact matches for other routes
    if (pathname === route) {
      return breadcrumbMap[route];
    }
  }
  return ["Feed Home"]; // Default fallback breadcrumb
}

function BreadcrumbProvider() {
  const pathname = usePathname();
  const breadcrumbTrail = resolveBreadcrumb(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbTrail.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbTrail.length - 1 ? (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="/">{item}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbTrail.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbProvider;
