const mysql = require('mysql2/promise');
require('dotenv');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.TEST_DB_NAME || 'hrm_test',
  waitForConnections: true,
  connectionLimit: 10,
});

beforeAll(async ()=>{
  await pool.execute('DROP TABLE IF EXISTS baseRepoTest;');
  await pool.execute(`CREATE TABLE baseRepoTest (
    id INT primary key auto_increment,
    name VARCHAR(255)
  );`);
  await pool.execute(`INSERT INTO baseRepoTest (name) VALUES('entity1');`);
  await pool.execute(`INSERT INTO baseRepoTest (name) VALUES('entity2');`);
});

const BaseRepository = require('../../../src/db/common/baseRepository');

const baseRepository = new BaseRepository(pool, 'baseRepoTest');
describe('Test methods of the base repository', ()=>{
  test('save method creates new entity'+
  ' if it does not already exist', async (done)=>{
    await baseRepository.save({id: 3, name: 'entity3'});
    const result = await pool.execute(`Select * from baseRepoTest where ` +
    `id=3 AND name = 'entity3'`);
    expect(result[0][0]).toEqual({id: 3, name: 'entity3'});
    done();
  });

  test('save method updates entity if it already exist', async (done)=>{
    await baseRepository.save({id: 3, name: 'entity5'});
    const result = await pool.execute(`Select * from baseRepoTest where`+
    ` id=3 AND name = 'entity5'`);
    expect(result[0][0]).toEqual({id: 3, name: 'entity5'});
    done();
  });


  test('delete method deletes the object if it exists', async (done)=>{
    await baseRepository.delete({id: 2, name: 'entity2'});
    const result = await pool.execute(`Select * from baseRepoTest`+
    ` where id=2 AND name = 'entity2'`);
    expect(result[0]).toEqual([]);
    done();
  });


  test('find method returns empty array if the no record equaling the'+
  ' given parameters found', async (done)=>{
    const result = await baseRepository.find({name: 'empty'});
    expect(result[0]).toEqual([]);
    done();
  });

  test('find metod returns an array of tuples if the records ' +
  'equaling the given parameters are found', async (done)=>{
    const result = await baseRepository.find({id: 1, name: 'entity1'});
    expect(result[0]).toEqual([{id: 1, name: 'entity1'}]);
    done();
  });
});
