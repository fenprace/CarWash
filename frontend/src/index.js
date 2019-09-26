import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout } from 'antd';
import enUS from 'antd/es/locale/en_US';

const Application = () => {
  return <h1>Hi!</h1>;
}

ReactDOM.render(<Application />, document.getElementById('application'));
