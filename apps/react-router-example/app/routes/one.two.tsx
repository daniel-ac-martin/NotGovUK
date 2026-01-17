import type { Route } from "./+types/one.two";
import { BackLink } from "@not-govuk/components";

const title = "Two";

export function meta({}: Route.MetaArgs) {
  return [
    { title },
    { name: "description", content: "Second page" },
  ];
}

export default function Page() {
  return (
    <>
      <BackLink />
      <h1>
        {title}
      </h1>
      <p>{title} content</p>
    </>
  );
}
