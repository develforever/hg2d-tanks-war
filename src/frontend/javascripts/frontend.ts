import debugModule from 'debug'
import { io } from "socket.io-client";

import reactapp from './react-app'

localStorage.debug = process.env.DEBUG

// @ts-ignore
import styles from '../stylesheets/style.css'

const socket = io();

socket.on('connect', () => {
    debug('client connected');
  });


const debug = debugModule('hg2d-tanks-war:server');

debug("frontend")

reactapp()