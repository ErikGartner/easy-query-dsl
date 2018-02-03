import MongoParser from './mongo-parser.js';

const easyQuery = {
  greet() {
    let parser = new MongoParser({});
    return 'hello';
  }
};

export default easyQuery;
