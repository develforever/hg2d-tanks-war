import debugModule from 'debug'

import reactapp from './react-app'

localStorage.debug = process.env.DEBUG
const debug = debugModule('hg2d-tanks-war:server');

// @ts-ignore
import styles from '../stylesheets/style.css'

reactapp()