/* global window document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Application } from './Application';

declare global {
  interface Window {
    __INITIAL_DATA__: {};
  }
}
const initialState: any = window.__INITIAL_DATA__;

// TODO: Switch to hyrate when we add SSR in
ReactDOM.render(<Application />, document.getElementById('app'));
