import bookshelf from './index.js';

const Agreement = bookshelf.Model.extend({
  tableName: 'agreements',
  
  idAttribute: 'id',
  
  
  format: function(attrs) {
    return attrs;
  },
  
  parse: function(attrs) {
    return attrs;
  }
});

export default Agreement; 