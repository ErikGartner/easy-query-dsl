class EasyQuery {

  constructor(options = {}) {
    this.options = options;
  }

  parse(queryString) {
    return EasyQuery._parse(queryString, this.options);
  }

  static _parse(query, options) {

    let keys = [];
    /* Go over every keyword */
    for (let key of options.keys) {
      let {matches, queryString} = EasyQuery._stringToKeyValues(query, key);
      query = queryString;
      if (Object.keys(matches).length > 0) {
        keys.push({key: key, matches: matches});
      }
    }

    /* Finally run default over the remaining string */
    query = query.trim();
    if (query.length > 0) {
      keys.push({
        key: options.default,
        matches: [{
          field: options.default.field, values: [query]}
        ]}
      );
    }

    /* Convert key -> values to selectors */
    let selectors = [];
    for (let km of keys) {
      for (let match of km.matches) {
        let selector = EasyQuery._keyValueToSelector(match, km.key);
        if (Object.keys(selector).length > 0) {
          selectors.push(selector);
        }
      }
    }

    if (selectors.length == 1) {
      return selectors[0];
    } else if (selectors.length == 0) {
      return {};
    } else {
      return {$and: selectors};
    }
  }

  static _stringToKeyValues(queryString, key) {

    let remainingQuery = queryString;

    let matches = [];

    /* Map alias a to non-capturing groups */
    let names =  key.alias.map(a => `(?:${a})`);

    /* Create regex list of the different key names */
    names = key.alias.join('|');

    /* Regex to get the key value pairs, allow either quoted or non-quoted values. */
    let regex = new RegExp(`(?:\\s*(?:${names}):\\s?"([^"]*)"\\s*|\\s*(?:${names}):\\s?([^\\s]*)\\s*)`, 'gi');

    let m = null;
    while (m = regex.exec(queryString)) {
      if (m.index === regex.lastIndex) {
        /* Avoids infinite loops with zero-width matches */
        regex.lastIndex++;
      }

      /* Check if group 1 or 2 matches */
      let value = m[1] ? m[1] : m[2];

      value = EasyQuery._splitMultiValues(value);

      /* Save the match and remove from the queryString */
      matches.push({field: key.field, values: value});
      remainingQuery = remainingQuery.replace(m[0], '');
    }

    return {matches: matches, queryString: remainingQuery};

  }

  static _splitMultiValues(value) {
    /* Splits a value string in to multiple using the delimitor */
    return value.split(';');
  }

  static _keyValueToSelector(keyValue, key) {

    switch (key.type) {

      case 'number':
        return EasyQuery._numberKeyValueToSelector(keyValue, key);

      case 'text':
        return EasyQuery._textKeyValueToSelector(keyValue, key);

      default:
        return EasyQuery._stringKeyValueToSelector(keyValue, key);

    }

  }

  static _stringKeyValueToSelector(keyValue, key) {

    let values = [];
    let options = key.opts.caseSensitive ? 'g' : 'gi';

    let field = key.field;
    for(let value of keyValue.values) {
      /* Escape regex characters */
      value = EasyQuery._escapeRegExp(value);

      /* Generate pattern */
      let pattern = key.opts.fuzzy ? `.*${value}.*` : value;

      /* Create selector */
      let v = {}
      v[field] = { $regex: pattern, $options: options };

      values.push(v);
    }

    if(values.length == 1) {
      return values[0];
    } else {
      return {$or: values};
    }

  }

  static _escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  static _numberKeyValueToSelector(keyValue, key) {

    let values = [];

    let field = key.field;
    for(let value of keyValue.values) {

      let operator = "$eq";
      if(value.startsWith('>=')) {
        operator = '$gte';
        value = value.substring(2);
      } else if (value.startsWith('<=')) {
        operator = '$lte';
        value = value.substring(2);
      } else if (value.startsWith('>')) {
        operator = '$gt';
        value = value.substring(1);
      } else if (value.startsWith('<')) {
        operator = '$lt';
        value = value.substring(1);
      } else if (value.startsWith('!')) {
        operator = '$ne';
        value = value.substring(1);
      }

      let tryValue = Number(value);
      if (!isNaN(tryValue)) {
        value = tryValue;
      }

      /* Create selector */
      let v = {}
      v[field] = {};
      v[field][operator] = value;

      values.push(v);
    }

    if(values.length == 1) {
      return values[0];
    } else {
      return {$or: values};
    }

  }

  static _textKeyValueToSelector(keyValue, key) {

    let searchString = keyValue.values.join(' ');
    return {
      $text: {
        $search: searchString,
        $caseSensitive: key.opts.caseSensitive,
        $diacriticSensitive: key.opts.diacriticSensitive
      }
    };

  }

}

export default EasyQuery;
