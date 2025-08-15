import { Radios, TextInput } from '@not-govuk/simple-components';

export default function Page() {
  return (
    <>
      <h1>
        Three
      </h1>
      <p>Three content</p>
      <p>Here is a conditional radios example:</p>
      <Radios
        label={
          <h1 className="govuk-heading-l">
            How would you prefer to be contacted?
          </h1>
        }
        name="how-contacted"
        options={[
          {
            value: "email",
            label: "Email",
            conditional: (
              <TextInput
                autoComplete="email"
                className="govuk-!-width-one-third"
                id="contact-by-email"
                label="Email address"
                name="contact-by-email"
                spellCheck={false}
                type="email"
              />
            ),
          },
          {
            value: "phone",
            label: "Phone",
            conditional: (
              <TextInput
                autoComplete="tel"
                className="govuk-!-width-one-third"
                id="contact-by-phone"
                label="Phone number"
                name="contact-by-phone"
                spellCheck={false}
                type="tel"
              />
            ),
          },
          {
            value: "text message",
            label: "Text message",
            conditional: (
              <TextInput
                autoComplete="tel"
                className="govuk-!-width-one-third"
                id="contact-by-text"
                label="Mobile phone number"
                name="contact-by-text"
                spellCheck={false}
                type="tel"
              />
            ),
          },
        ]}
        hint="Select one option."
      />
    </>
  );
}
