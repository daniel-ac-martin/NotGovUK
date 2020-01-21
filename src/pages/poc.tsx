import * as React from 'react';
import {
  A,
  BackLink,
  Breadcrumbs,
  Button,
  Checkboxes,
  DateInput,
  Details,
  PhaseBanner,
  Radios,
  SubmitButton,
  TextInput
} from '../lib';

const Page = props => (<>
  <h1><span className="caption">Caption</span> Typography</h1>
  <h2><span className="caption">Typography</span> Sub-heading</h2>
  <h3><span className="caption">Typography</span> Sub-sub-heading</h3>
  <h4><span className="caption">Typography</span> Sub-sub-sub-heading</h4>
  <p className="lead">This is a leading paragraph.</p>
  <p>This is another paragraph</p>
  <p className="small">This is a small paragraph</p>
  <h2><span className="caption">Typography</span> Lists</h2>
  <h3>Plain lists</h3>
  <ul className="plain">
    <li><A href="#">Benefits calculators</A></li>
    <li><A href="#">Benefit overpayments</A></li>
    <li><A href="#">Benefit fraud</A></li>
    <li><A href="#">More</A></li>
  </ul>
  <h3>Bulletted lists</h3>
  <p>You can buy:</p>
  <ul>
    <li>apples</li>
    <li>oranges</li>
    <li>pears</li>
  </ul>
  <h3>Ordered lists</h3>
  <ol>
    <li>Delivery address.</li>
    <li>Payment.</li>
    <li>Confirmation.</li>
  </ol>
  <hr />
  <h1>Components</h1>
  <form>
    <h2>Back links</h2>
    <BackLink href="#" />
    <h2>Breadcrumbs</h2>
    <Breadcrumbs items={[
      { text: 'Section', href: '#' },
      { text: 'Subsection', href: '#' },
      { text: 'Subsection', href: '#' }
    ]} />
    <h2>Buttons</h2>
    <SubmitButton value="Save and continue" />
    <Button value="Save as draft" />
    <Button value="Delete" warning />
    <SubmitButton value="Disabled" disabled />
    <h2>Checkboxes</h2>
    <Checkboxes
      name="waste-type"
      label="Which types of waste do you transport?"
      hint="Select all that apply."
      options={[
        { value: '1', label: 'Waste from animal carcasses' },
        { value: '2', label: 'Waste from mines or quarries' },
        { value: '3', label: 'Farm or agricultural waste', disabled: true }
      ]}
    />
    <h3>Errors</h3>
    <Checkboxes
      name="nationality-error"
      label="What is your nationality?"
      hint="If you have dual nationality, select all options that are relevant to you."
      error="Select if you are British, Irish or a citizen of a different country"
      options={[
        { value: '1', label: 'British', hint: 'including English, Scottish, Welsh and Northern Irish' },
        { value: '2', label: 'Irish' },
        { value: '3', label: 'Citizen of another country' }
      ]}
    />
    <h2>Date input</h2>
    <DateInput
      name="passport-issued"
      label="When was your passport issued?"
      hint="For example, 12 11 2007"
    />
    <h3>Errors</h3>
    <DateInput
      name="passport-issued-error"
      label="When was your passport issued?"
      hint="For example, 12 11 2007"
      error="The date your passport was issued must be in the past"
    />
    <h2>Details</h2>
    <Details summary="Help with nationality">
      We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.
    </Details>
    <h2>Phase banner</h2>
    <PhaseBanner id="phase-banner" phase="beta">This is a new service - your <A href="/feedback">feedback</A> will help us to improve it.</PhaseBanner>
    <h2>Radios</h2>
    <Radios
      name="changed-name"
      label="Have you changed your name?"
      hint="This includes changing your last name or spelling your name differently."
      options={[
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
        { value: '2', label: 'Maybe', disabled: true }
      ]}
    />
    <h3>Errors</h3>
    <Radios
      name="changed-name-error"
      label="Have you changed your name?"
      hint="This includes changing your last name or spelling your name differently."
      error="Select yes if you have changed your name"
      options={[
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
        { value: '2', label: 'Maybe', disabled: true }
      ]}
    />
    <h2>Text input</h2>
    <TextInput label="Event name" name="event-name" hint="The name you’ll use on promotional material." />
    <h3>Errors</h3>
    <TextInput label="Event name" name="event-name" hint="The name you’ll use on promotional material." error="Enter an event name" />
    <h3>Fixed width</h3>
    <TextInput label="20 character width" name="width-20" width={20} />
    <TextInput label="10 character width" name="width-10" width={10} />
    <TextInput label="5 character width" name="width-5" width={5} />
    <TextInput label="4 character width" name="width-4" width={4} />
    <TextInput label="3 character width" name="width-3" width={3} />
    <TextInput label="2 character width" name="width-2" width={2} />
    <h3>Fluid width</h3>
    <TextInput label="Full width" name="full" className="width-full" />
    <TextInput label="Three-quarters width" name="three-quarters" className="width-three-quarters" />
    <TextInput label="Two-thirds width" name="two-thirds" className="width-two-thirds" />
    <TextInput label="One-half width" name="one-half" className="width-one-half" />
    <TextInput label="One-third width" name="one-third" className="width-one-third" />
    <TextInput label="One-quarter width" name="one-quarter" className="width-one-quarter" />
  </form>
</>);

export default Page;
