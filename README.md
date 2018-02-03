# easy-query-dsl
*A DSL for turning string into Mongo selectors.*

[![Travis build status](http://img.shields.io/travis/ErikGartner/easy-query-dsl.svg?style=flat)](https://travis-ci.org/ErikGartner/easy-query-dsl)
[![Code Climate](https://codeclimate.com/github/ErikGartner/easy-query-dsl/badges/gpa.svg)](https://codeclimate.com/github/ErikGartner/easy-query-dsl)
[![Test Coverage](https://codeclimate.com/github/ErikGartner/easy-query-dsl/badges/coverage.svg)](https://codeclimate.com/github/ErikGartner/easy-query-dsl)
[![Dependency Status](https://david-dm.org/ErikGartner/easy-query-dsl.svg)](https://david-dm.org/ErikGartner/easy-query-dsl)
[![devDependency Status](https://david-dm.org/ErikGartner/easy-query-dsl/dev-status.svg)](https://david-dm.org/ErikGartner/easy-query-dsl#info=devDependencies)

Options::
```javascript
{
  default: {
    field: 'field_name',
    type: 'string',
    opts: {
      caseSensitive: false,
      fuzzy: true,
    }
  }
  keys: [
    {
      field: 'field_name',
      alias: ['f1'],
      type: 'string',
      opts: {
        caseSensitive: false,
        fuzzy: true,
      }
    }
  ]
}
```

## Examples
String type:
```
key: value -> {key: value}
key: "value with spaces" -> {key: "value with spaces"}
key: value1; value2 -> {$or: [{key: value1}, {key: value2}]
key: value1  key: value2 -> {$and: [{key: value1}, {key: value2}]
key1: value1  key2: value2 -> {$and: [{key1: value1}, {key2: value2}]
```

Given number type:
```
key: >value > key: {$gt: value}
```

Given fuzzy type:
```
key: value -> {key: .*value.*}
```

Given text type:
```
key: value -> {$text: {$search: value, $caseSensitive: false, $diacriticSensitive: false}}
```
