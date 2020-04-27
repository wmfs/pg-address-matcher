'use strict'

function insertUnmatchedRecords (options, client) {
  return client.query(
    generateStatement(options)
  )
}

function generateStatement (options) {
  return `INSERT INTO ${options.match.schema}.${options.match.table} (${options.source.id}, match_certainty) ` +
    `SELECT ${options.source.id}, 0 ` +
    `FROM ${options.source.schema}.${options.source.table} ` +
    `ON CONFLICT (${options.source.id}) do nothing;`
}

module.exports = insertUnmatchedRecords
