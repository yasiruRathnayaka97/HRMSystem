const DependentService = require('../services/dependent.service');
const EmployeeRecordService = require('../services/employeeRecord.service');
const db = require('../db');

/** Class representing information about an employeee */
class EmployeeRecord {
  /**
   * Create an EmployeeRecord object with the given data
   * @param {Object} data - The data of the record.
   */
  constructor(data) {
    Object.assign(this, data);
    Object.seal(this);
  }

  /**
   *
   */
  get department() {
    //  Fetch department data from database
    if (this._department) {
      return this._department;
    }
  }

  /**
   * @param {Object} department
   */
  set department(department) {
    this.departmentId = department.id;
    this._department = department;
  }

  // /**
  //  *
  //  */
  // get dependentInformation() {
  //   // Fetch dependentInfromation from database
  //   if (this._dependentInformation) {
  //     return this._dependentInformation;
  //   }
  //   const ds = new DependentService(db);
  //   this._dependentInformation = ds.getDependents(this.id);
  //   return this._dependentInformation;
  // }

  // /**
  //  *
  //  */
  // get addresses() {
  //   // Fetch address data from database
  //   if (this._addresses) {
  //     return this._addresses;
  //   }
  //   const recordService = new EmployeeRecordService(db);
  //   this._addresses = await recordService.getAddresses(this.id);
  // }
}

module.exports = EmployeeRecord;
