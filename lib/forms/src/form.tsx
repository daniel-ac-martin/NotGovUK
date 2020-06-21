import { FC, Fragment, createElement as h } from 'react';
import { FormikProps } from 'formik';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

export type FormProps = JSX.IntrinsicElements["form"] & FormikProps<any>;

export const Form: FC<FormProps> = props => (
  <Fragment>
    <form
      action={props.action}
      id={props.id}
      method={props.method}
      onReset={props.onReset}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
    <hr />
    <div className="width-one-half" style={{ float: 'left' }}>
      <h2>State</h2>
      <h3>values</h3>
      <pre>
        {prettyPrint(props.values)}
      </pre>
      <h3>touched</h3>
      <pre>
        {prettyPrint(props.touched)}
      </pre>
      <h3>errors</h3>
      <pre>
        {prettyPrint(props.errors)}
      </pre>
    </div>
  </Fragment>
);

export default Form;
