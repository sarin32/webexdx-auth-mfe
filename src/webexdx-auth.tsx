import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  // errorBoundary(err, info, props) {
  errorBoundary(err) {
    // Customize the root error boundary for your microfrontend here.
    return <>{err.toString()}</>;
  },
});

export const {bootstrap, mount, unmount} = lifecycles;
