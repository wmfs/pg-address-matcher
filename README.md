# pg-address-matcher
[![Tymly Package](https://img.shields.io/badge/tymly-package-blue.svg)](https://tymly.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@wmfs/pg-address-matcher.svg)](https://www.npmjs.com/package/@wmfs/pg-address-matcher)
[![CircleCI](https://circleci.com/gh/wmfs/pg-address-matcher.svg?style=svg)](https://circleci.com/gh/wmfs/pg-address-matcher)
[![codecov](https://codecov.io/gh/wmfs/pg-address-matcher/branch/master/graph/badge.svg)](https://codecov.io/gh/wmfs/pg-address-matcher)
[![CodeFactor](https://www.codefactor.io/repository/github/wmfs/pg-address-matcher/badge)](https://www.codefactor.io/repository/github/wmfs/pg-address-matcher)
[![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/tymly/blob/master/packages/pg-concat/LICENSE)





> A package to link two database tables by addresses

## Usage

```
const addressMatch = require('@wmfs/pg-address-matcher')

addressMatch(
    {
     source: {
       schema: 'link_test',
       table: 'food',
       id: 'food_id',
       type: 'bigint'
     },
     target: {
       schema: 'link_test',
       table: 'addressbase',
       id: 'address_id',
       type: 'bigint'
     },
     link: {
       schema: 'link_test_results',
       table: 'food_addressbase',
       map: {
         postcode: {
           source: 'postcode',
           target: 'postcode'
         },
         businessName: {
           source: ['business_name', 'address_line_1'],
           target: ['organisation_name', 'organisation', 'building_name']
         }
       }
     }
    }
)
```

The package will look at the options and try to match the records from the source table to the records from the target table
and assign the id's given in the options to the link table. <br>
The package currently matches on postcode and business name where the column names are indicated in the options provided. 

## <a name="install"></a>Install
```bash
$ npm install pg-address-matcher --save
```
This package requires the database to have the "fuzzystrmatch" extension for Postgres which is achieved by:
```
CREATE EXTENSION "fuzzystrmatch";
```

## <a name="license"></a>License
[MIT](https://github.com/wmfs/pg-delta-file/blob/master/LICENSE)
