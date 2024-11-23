import type { MetaFunction } from "@remix-run/node";
import { BackLink } from "@not-govuk/components";

const title = "Two";

export const meta: MetaFunction = () => {
  return [
    { title },
    { name: "description", content: "Second page" },
  ];
};

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
