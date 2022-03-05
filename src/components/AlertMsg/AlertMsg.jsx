import React from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.min.css';

function AlertMsg() {
  return (
    <Alert
      className="alert"
      message="Error"
      description="Нам чертовски жаль, но произошла ошибка вселенского масштаба ..."
      type="error"
      showIcon
    />
  );
}

export default AlertMsg;
