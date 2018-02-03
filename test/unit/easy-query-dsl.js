import EasyQuery from '../../src/easy-query-dsl';

describe('EasyQuery', () => {

  describe('_stringToKeyValues', () => {

    it('should handle simple queries', () => {
      let key = {
        field: 'key',
        alias: ['key'],
        type: 'string',
        opts: {
          caseSensitive: false,
          fuzzy: true,
        }
      }

      let {matches, queryString} = EasyQuery._stringToKeyValues('key: value key2: hej', key);
      expect(matches[0].field).to.equal(key.field);
      expect(matches[0].values[0]).to.equal('value');
      expect(queryString).to.equal('key2: hej');
    });

  });

  describe('_stringKeyValueToSelector', () => {

    it('should handle simple queries', () => {
      let key = {
        field: 'key',
        alias: ['key'],
        type: 'string',
        opts: {
          caseSensitive: false,
          fuzzy: true,
        }
      }

      let kv = {
        field: 'key',
        values: ['value1', 'value2'],
      }

      let selector = EasyQuery._stringKeyValueToSelector(kv, key);
    });

  });

  describe('_numberKeyValueToSelector', () => {

    it('should handle simple queries', () => {
      let key = {
        field: 'key',
        alias: ['key'],
        type: 'number',
        opts: {
          caseSensitive: false,
          fuzzy: true,
        }
      }

      let kv = {
        field: 'key',
        values: ['-5', '<2','<q'],
      }

      let selector = EasyQuery._numberKeyValueToSelector(kv, key);
    });

  });

  describe('_textKeyValueToSelector', () => {

    it('should handle simple queries', () => {
      let key = {
        field: 'key',
        alias: ['key'],
        type: 'text',
        opts: {
          caseSensitive: false,
          diacriticSensitive: false,
        }
      }

      let kv = {
        field: 'key',
        values: ['hello', 'my little', 'kitten'],
      }

      let selector = EasyQuery._textKeyValueToSelector(kv, key);
    });

  });

  describe('_parse', () => {

    it('should handle simple queries', () => {
      let options = {
        default: {
          field: 'default',
          type: 'text',
          opts: {
            caseSensitive: false,
            diacriticSensitive: false,
          }
        },
        keys: [
          {
            field: 'capacity',
            alias: ['cap'],
            type: 'number',
            opts: {},
          },
          {
            field: 'clan',
            alias: ['clan', 'cl'],
            type: 'string',
            opts: {
              caseSensitive: false,
              fuzzy: true,
            }
          }
        ]
      };

      let query = 'harde cap: >5 cl: ventrue';
      let selector = EasyQuery._parse(query, options);
    });

  });

});
