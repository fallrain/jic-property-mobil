'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  redirect_uri: '"http://hospital.thkmore.com/mobile/wx/redirect/greet"',
  base_url: '"http://39.98.73.11:8092/mobile/"'
})
