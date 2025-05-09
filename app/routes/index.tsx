import { Sidebar } from "@/components/sidebar/Sidebar";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
  <div>
    <h1>This is home page</h1>
    <Sidebar />
  </div>
  );
}
