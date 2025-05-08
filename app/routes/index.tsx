// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}
