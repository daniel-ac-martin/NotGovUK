import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Styles/Typography',
  args: {}
} satisfies Meta<typeof undefined>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <h1>govuk-heading-xl</h1>
      <h2>govuk-heading-l</h2>
      <h3>govuk-heading-m</h3>
      <h4>govuk-heading-s</h4>
    </>
  )
};

export const HeadingsWithCaptions: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <h1>
          <span className="caption">govuk-caption-xl</span>govuk-heading-xl
      </h1>
      <h2>
          <span className="caption">govuk-caption-l</span>govuk-heading-l
      </h2>
      <h3>
          <span className="caption">govuk-caption-m</span>govuk-heading-m
      </h3>
      <h4>
          <span className="caption">govuk-caption-s</span>govuk-heading-s
      </h4>
    </>
  ),
  name: 'Headings with captions'
};

export const Paragraphs: Story = {
  args: {},
  render: ({ ...props }) => <p>govuk-body</p>
};

export const LeadParagraphs: Story = {
  args: {},
  render: ({ ...props }) => <p className="lead">govuk-body-l</p>,
  name: 'Lead paragraphs'
};

export const Links: Story = {
  args: {},
  render: ({ ...props }) => <a href="#">govuk-link</a>
};

export const Lists: Story = {
  args: {},
  render: ({ ...props }) => (
    <ul className="plain">
      <li>
        <a href="#">Benefits calculators</a>
      </li>
      <li>
        <a href="#">Benefit overpayments</a>
      </li>
      <li>
        <a href="#">Benefit fraud</a>
      </li>
      <li>
        <a href="#">More</a>
      </li>
    </ul>
  )
};

export const BulletedLists: Story = {
  args: {},
  render: ({ ...props }) => (
    <>
      <p>You can buy:</p>
      <ul>
        <li>apples</li>
        <li>oranges</li>
        <li>pears</li>
      </ul>
    </>
  ),
  name: 'Bulleted lists'
};

export const NumberedLists: Story = {
  args: {},
  render: ({ ...props }) => (
    <ol>
      <li>Delivery address.</li>
      <li>Payment.</li>
      <li>Confirmation.</li>
    </ol>
  ),
  name: 'Numbered lists'
};

export const SectionBreak: Story = {
  args: {},
  render: ({ ...props }) => <hr />,
  name: 'Section break'
};
