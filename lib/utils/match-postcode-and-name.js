'use strict'

function matchPostcodeAndName (options, client) {
  return client.query(
    match(options, 'exact', 2) +
    match(options, 'fuzzy', 3)
  )
}

function match (options, type, certainty) {
  const statement =
    `INSERT INTO ${options.match.schema}.${options.match.table} (${options.source.id}, ${options.target.id}, match_certainty) ` +
    `SELECT source.${options.source.id}, target.${options.target.id}, ${certainty} ` +
    `FROM ${options.source.schema}.${options.source.table} source, ${options.target.schema}.${options.target.table} target ` +
    `WHERE source.${options.match.map.postcode.source} = target.${options.match.map.postcode.target} ` +
    'AND ' +
    processWhere(type, options.match.map.businessName.source, options.match.map.businessName.target) +
    `ON CONFLICT (${options.source.id}) do nothing; `

  return statement
}

function processWhere (type, source, target) {
  if (!Array.isArray(source)) source = [source]
  if (!Array.isArray(target)) target = [target]

  const parts = []
  source.forEach(s => {
    target.forEach(t => {
      parts.push(compare(s, t, type))
    })
  })
  return `(${parts.join(' OR ')}) `
}

function compare (s, t, type) {
  switch (type) {
    case 'exact':
      return `upper(${s}) = upper(${t})`
    case 'fuzzy':
      return `difference(${s}, ${t}) = 4`
  }
} // compare

module.exports = matchPostcodeAndName
matchPostcodeAndName.processWhere = processWhere
