import { FC, Fragment, createElement as h } from 'react';
import { FormikProps } from 'formik';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

export type FormProps = JSX.IntrinsicElements["form"] & FormikProps<any> & {
  debug?: boolean
};

export const Form: FC<FormProps> = ({children, debug = false, errors, touched, values, ...attrs}) => (
  <Fragment>
    <form {...attrs} >
      {children}
    </form>
    { !debug ? null : (
      <Fragment>
      <hr />
      <div className="width-one-half" style={{ float: 'left' }}>
        <h2>State</h2>
        <h3>values</h3>
        <pre>
          {prettyPrint(values)}
        </pre>
        <h3>touched</h3>
        <pre>
          {prettyPrint(touched)}
        </pre>
        <h3>errors</h3>
        <pre>
          {prettyPrint(errors)}
        </pre>
      </div>
      </Fragment>
    ) }
  </Fragment>
);

export default Form;
