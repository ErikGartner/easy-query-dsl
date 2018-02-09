# Easy Query
*A DSL for turning search strings into Mongo selectors.*

[![npm](https://img.shields.io/npm/v/easy-query-dsl.svg)](https://www.npmjs.com/package/easy-query-dsl) 
The motivation behind this tiny library is that I needed a super simple
query language usable by end users without any programming knowledge.

For example the search string: `name: "John Appleseed" age: >20` would yield a selector:
```javascript
{$and: [{name: "John Appleseed"}, {age: {$gt: 20}}]}
```

The simple format can be explained quickly to the users as:

- Write `key: value` or `key: "value with space"`
- Either `value1` or `value2`: `key: value1;value2`
- Both `value1` and `value2`: `key: value1 key: value2`
- Less than `key: <5` etc.

## Installation

The package is on npm and installable as: `npm install easy-query-dsl`.

## Usage

Using the library isn't complicated either:
```javascript
var eq = EasyQuery(options);
eq.parse('name: "John Appleseed" age: >20');
```

Though to produce correct queries you need to configure the library
using the **options object**.

It has two fields: `default` and `keys`. Default contain one *key* object and keys contains a list of *key* objects.

The default field defines how searches not specifying any key is handled and keys defines how to handle `key: value` searches.

A key object defines a field to search for over the database and how to handle that field.

There are three types of key objects:

#### String
The string type handles the values as strings and uses Regular Expressions in the selector.

They have two options: *caseSensitive* and *fuzzy*.
```javascript
{
  field: 'field_name',     // The name of the field in the database.
  type: 'string',          // The type
  alias: ['f'],            // The strings used by the user to specify the field
  opts: {                 // Options for that type
    caseSensitive: false,
    fuzzy: true,
  }
}
```

#### Number
The number type handles the values as number and allows the user to specify comparators such as: `>5`, `<5`, `!5`, `>=5` and `<=5` for the value.

```javascript
{
  field: 'field_name',
  type: 'number',
  alias: ['f'],
  opts: {}
}
```

#### Text
The text type uses the Mongo text search operator and requires a text index for that field. Note that the text operator comes with restrictions and an internal syntax in mongo. Read more [here](https://docs.mongodb.com/manual/reference/operator/query/text/).


They have two options: *caseSensitive* and *diacriticSensitive*.
```javascript
{
  field: 'field_name',
  type: 'text',
  alias: ['f1'],
  opts: {
    caseSensitive: false,
    diacriticSensitive: false,
  }
}
```

### Complete Example

```javascript
{
  default: {
    field: 'field_name',
    type: 'text',
    // The default doesn't use the alias field.
    opts: {
      caseSensitive: false,
      diacriticSensitive: false,
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
    },
    {
      field: 'field_name',
      alias: ['f1'],
      type: 'number',
      opts: {}
    }
  ]
}
```

## Language Definition
*Below follows an informal sketch of the language.*

#### Basics:
```
key: value -> {key: value}
key: "value with spaces" -> {key: "value with spaces"}
key: value1;value2 -> {$or: [{key: value1}, {key: value2}]
key: value1  key: value2 -> {$and: [{key: value1}, {key: value2}]
key1: value1  key2: value2 -> {$and: [{key1: value1}, {key2: value2}]
```

#### String type:
Fuzzy: `key: value -> {key: $regex{ pattern: .*value.*} }`

#### Number type:
```
key: >value -> key: {$gt: value}
key: <=value -> key: {$lte: value}
key: !value -> key: {$ne: value}
```

#### Text type:
```
key: value -> {$text: {$search: value, $caseSensitive: false, $diacriticSensitive: false}}
```

## License
The MIT License (MIT)

Copyright (c) 2018 Erik Gärtner
