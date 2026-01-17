import type { Route } from "./+types/one._index";

const title = "One";

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: "First page" },
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
