import easyQuery from '../../src/easy-query-dsl';

describe('easyQuery', () => {
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
});
