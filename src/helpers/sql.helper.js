const sqlHelper = {
  prepareForOneInsert(table, attributes) {
    return this.prepareForInsert(table, attributes, 1);
  },
  prepareForInsert(table, attributes, count) {
    const tuples = [];

    for (let i = 0; i < count; i++) {
      tuples.push(`(${attributes.map((key) => '?').join(', ')})`);
    }
    const query = `INSERT INTO ${table}` +
            `(${attributes.map(((key)=> key)).join(', ')}) VALUES ` +
            tuples.join(', ');

    return query;
  },
};

module.exports = sqlHelper;
