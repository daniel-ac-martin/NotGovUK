import type { Route } from "./+types/feedback";
import { Form, required } from '@not-govuk/components';
import { siteTitle } from '../config';

export const title = 'Feedback';
const description = `Feedback form for ${siteTitle}.`;

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${title} - ${siteTitle}` },
    { name: 'description', content: description },
    { name: 'og:title', content: title },
    { name: 'og:description', content: description },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  return {
    result: !!(formData.get('feedback')),
    formData: Object.fromEntries(formData)
  };
}

export default function Feedback({
  actionData
}: Route.ComponentProps) {
  return (
    <>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          { actionData?.result ? (
              <>
                <h1>{title}</h1>
                <p>Feedback successfully submitted.</p>
              </>
          ) : (
              <Form action="?" method="post" initialValues={actionData?.formData}>
                <Form.Textarea
                  name="feedback"
                  label={<h1>{title}</h1>}
                  hint="Write the feedback you would like to provide"
                  validators={[
                    required('Write something'),
                  ]}
                />
                <Form.Submit>Continue</Form.Submit>
              </Form>
            )}
        </div>
      </div>
    </>
  );
}
