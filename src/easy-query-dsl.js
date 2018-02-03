class EasyQuery {

  constructor(options = {}) {
    this.options = options;
  }

  _parse(queryString, options) {

    /* Go over every keyword */
    for (let key of options.keys.forEach) {
      EasyQuery._stringToKeyValues(queryString, key);
    }

  }

  _stringToKeyValues(queryString, key) {

    let remainingQuery = queryString;

    let matches = [];

    /* Create regex list of the different key names */
    let names = key.alias.join('|');

    /* Regex to get the key value pairs, allow either quoted or non-quoted values. */
    let regex = new RegExp(`(?:\\s*(?:${names}):\\s?"([^"]*)"\\s*|\\s*(?:${names}):\\s?([^\\s]*)\\s*)`, 'gi');
    console.log(regex);

    let m = null;
    while (m = regex.exec(queryString)) {
      if (m.index === regex.lastIndex) {
        /* Avoids infinite loops with zero-width matches */
        regex.lastIndex++;
      }

      if(m[1]) {
        var value = m[1];
      } else {
        var value = m[2];
      }

      matches.push({field: key.field, value: value});
      remainingQuery = remainingQuery.replace(m[0], '');
    }

    return {matches: matches, queryString: remainingQuery};

  }

}

export default EasyQuery;
