import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router Framework!" },
  ];
}

export default function Index({}: Route.ComponentProps) {
  return (
    <>
      <h1>
        My page
      </h1>
      <p>My content</p>
    </>
  );
}
