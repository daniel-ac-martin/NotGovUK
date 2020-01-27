import * as React from 'react';

const prettyPrint = obj => JSON.stringify(obj, undefined, 2);

export const Form: React.SFC<any> = props => (
  <React.Fragment>
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
      <h3>errors</h3>
      <pre>
        {prettyPrint(props.errors)}
      </pre>
    </div>
  </React.Fragment>
);

export default Form;
