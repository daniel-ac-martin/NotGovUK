import type { Route } from "./+types/four";

const title = "Four";

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: "Forth page" },
  ];
}

export default function Page() {
  return (
    <>
      <h1>
        {title}
      </h1>
      <p>{title} content</p>
    </>
  );
}
