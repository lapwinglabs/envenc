/**
 * Module Dependencies
 */

var localenv = require('localenv/noload')
var write = require('fs').writeFileSync
var exists = require('fs').existsSync
var read = require('fs').readFileSync
var crypto = require('crypto')
var concat = Buffer.concat
var fs = require('fs')

/**
 * File paths
 */

var local_decrypted_file = '.env.local'
var encrypted_file = '.env.enc'
var decrypted_file = '.env'

/**
 * Environment
 */

var production = process.env.NODE_ENV === 'production'

/**
 * Export `encenv`
 */

exports = module.exports = encenv

/**
 * Decrypt the environment variables
 */

function encenv (pwd) {
  if (!pwd) throw new Error('encenv requires a password')

  exports.decrypt(pwd)
  !production && localenv.inject_env(decrypted_file)
  localenv.inject_env(local_decrypted_file)
}

/**
 * Encrypt
 *
 * @param {String} decrypted
 * @param {String} pwd
 */

exports.encrypt = function encrypt (pwd) {
  if (!pwd) throw new Error('encrypt requires a password')

  if (!exists(decrypted_file)) {
    throw new Error(decrypted_file + ' does not exist')
  }

  var cipher = crypto.createCipher('cast5-cbc', pwd)
  var buf = concat([ cipher.update(read(decrypted_file)), cipher.final() ])

  write(encrypted_file, buf)
}

/**
 * Decrypt
 *
 * @param {String} encrypted
 * @param {String} pwd
 */

exports.decrypt = function decrypt (pwd) {
  if (!pwd) throw new Error('encrypt requires a password')

  if (!exists(encrypted_file)) {
    throw new Error(encrypted_file + ' does not exist')
  }

  var decipher = crypto.createDecipher('cast5-cbc', pwd)

  try {
    var buf = concat([ decipher.update(read(encrypted_file)), decipher.final() ])
  } catch (e) {
    throw new Error('invalid password')
  }

  write(decrypted_file, buf)
}
