
const pool = require('../../../src/db');

beforeAll(async (done)=>{
  await pool.execute(`SET FOREIGN_KEY_CHECKS=0;`);
  done();
});

const EmployeeRecordRepository = require('../../../src/repositories/employeeRecord.repository');
const employeeRecordRepository = new EmployeeRecordRepository(pool);
var id;

describe('EmployeeRepository method test', ()=>{

  test('save method adds a new record if it doesn\'t already exist', async (done)=>{
    let res = await employeeRecordRepository.save({
      firstName: 'JohnTest',
      middleName: 'Dee',
      lastName: 'Doe',
      maritalStatus: 'single',
      employmentType: 'permenanent',
      jobTitle: 'Senior Executive',
      paygrade: 'Level1',
      supervisor: {id: null},
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'city',
        region: 'region',
        country: 'country',
      },
      birthday: '1990/03/04',
      photo: '',
      salary: 20000.0,
      department: {id: 1},

    });
    id =res[0].insertId;

    const result = await pool.execute(`Select * from employee_record where first_name='JohnTest'`);
    expect(result[0][0].first_name).toBe('JohnTest');
    done();
  });
  test('save method updates the record if it already exists', async (done)=>{
    await employeeRecordRepository.save({
      id,
      firstName: 'JohnTest234',
      middleName: 'Dee',
      lastName: 'Doe',
      maritalStatus: 'single',
      employmentType: 'permenanent',
      jobTitle: 'Senior Executive',
      paygrade: 'Level1',
      supervisor: {id: null},
      addresses: [{
        id: 1,
        line1: 'line1',
        line2: 'line2',
        city: 'city',
        region: 'region',
        country: 'country',
      }],
      birthday: '1990/03/04',
      photo: '',
      salary: 20000.0,
      department: {id: 1},

    });
    const result = await pool.execute('Select * from employee_record where first_name=\'JohnTest234\'');
    expect(result[0][0].id).toEqual(id);
    done();
  });

});

afterAll(async (done)=>{
  // await pool.execute(`DELETE from address where id = '${addressId}'`);
  // await pool.execute(`DELETE from city where name= 'test_city'`);
  // await pool.execute(`DELETE from region where region= 'test_region'`);
  // await pool.execute(`INSERT INTO baseRepoTest (name) VALUES('entity2');`);
  await pool.execute(`DELETE from employee_record where id = ${id}`);
  await pool.execute(`SET FOREIGN_KEY_CHECKS=0;`);
  done();
});
