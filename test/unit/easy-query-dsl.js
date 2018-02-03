import EasyQuery from '../../src/easy-query-dsl';

describe('EasyQuery', () => {
  /*
  describe('Greet function', () => {
    beforeEach(() => {
      spy(easyQuery, 'greet');
      easyQuery.greet();
    });

    it('should have been run once', () => {
      expect(easyQuery.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(easyQuery.greet).to.have.always.returned('hello');
    });
  });
  */

  describe('_stringToKeyValues', () => {

    it('should handle simple queries', () => {
      let eq = new EasyQuery();
      let key = {
        field: 'key',
        alias: ['key'],
        type: 'string',
        opts: {
          caseSensitive: false,
          fuzzy: true,
        }
      }

      let {matches, queryString} = eq._stringToKeyValues('key: value key2: hej', key);
      expect(matches[0].field).to.equal(key.field);
      expect(matches[0].value).to.equal('value');
      expect(queryString).to.equal('key2: hej');
    });


  });

});
