/**
 * Employee Record Service
 */
import EmployeeRecordRepository from
  '../repositories/employeeRecord.repository';

import CustomAttributeValueRepository from
  '../repositories/customAttributeValue.repository';
import EmployeeRecord from
  '../models/employeeRecord.model';
import {camelCase} from 'lodash';
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

    const record = await recordRepo.save(data);

    // TODO : Do the filtering here not in the repository
    const customRepo = new CustomAttributeValueRepository(this.db);
    const attributes = await customRepo.createMany(record.id, custom);

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
}

export default EmployeeRecordService;
