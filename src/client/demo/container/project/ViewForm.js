import { Button } from 'antd';
import React from 'react';

function ViewForm(props) {
  const { reset, formSelected } = props;

  return (
    <div>
      formSelected
      <Button onClick={reset}>Back</Button>
    </div>
  );
}

export default ViewForm;
