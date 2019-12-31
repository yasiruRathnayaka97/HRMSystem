/**
 * Employee Record Service
 */
const EmployeeRecordRepository =
  require('../repositories/employeeRecord.repository');
const CustomAttributeValueRepository =
  require('../repositories/customAttributeValue.repository');
const EmployeeRecord = require('../models/employeeRecord.model');
const camelCase = require('lodash').camelCase;
/**
 *
 */
class EmployeeRecordService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} data
   * @param {*} custom
   */
  async create(data, custom) {
    // TODO: Refactor this and getId
    // Insert employee record
    const recordRepo = new EmployeeRecordRepository(this.db);

    data.id = (await recordRepo.save(data))[0].insertId;


    // TODO : Do the filtering here not in the repository
    const customRepo = new CustomAttributeValueRepository(this.db);
    let attributes = {};
    if (Object.keys(custom).length) {
      attributes = await customRepo.createMany(data.id, custom);
    }

    const employee = {};

    Object.assign(employee, data);
    Object.assign(employee, attributes);

    return new EmployeeRecord(employee);
  }

  /**
   *
   * @param {*} id
   */
  async getById(id) {
    const recordRepo = new EmployeeRecordRepository(this.db);

    const result = await recordRepo.find(
        {
          id,
        },
    );

    employee = new EmployeeRecord({});

    if (result) {
      Object.assign(employee, result);

      // Populate the custom attributes
      const attributes = await CustomAttributeValueRepository.find({
        employee_record_id: id,
      });

      for (const attribute of attributes) {
        employee[camelCase(attribute.attribute_name)] = attribute.value;
      }

      Object.seal(employee);
      return employee;
    } else {
      // Throw error
    }
  }
  //this is a procedeuralimplementation
  async delete(id){
    const recordRepo = new EmployeeRecordRepository(this.db);
    recordRepo.deleteExistence(id);
  }
}

module.exports = EmployeeRecordService;
