import debugModule from 'debug'

localStorage.debug = process.env.DEBUG

const loggerName = 'hg2d-tanks-war:server'
const debug = debugModule(loggerName);

export default debug