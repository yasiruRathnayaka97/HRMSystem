const db = require('../../db');
const EmployeeRecordService = require('../../services/employeeRecord.service');
const CustomAttributeService =
  require('../../services/customAttribute.service');
const AddressRepository = require('../../repositories/address.repository');
const camelCase = require('lodash');
const DependentRepository = require('../../repositories/dependent.repository');
/**
 *
 */
class RecordController {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
  static async create(req, res, next) {
    // Extract default data from request
    const {
      firstName,
      middleName,
      lastName,
      maritalStatus,
      employmentType,
      jobTitle,
      paygrade,
      supervisorId,
      birthday,
      photo,
      salary,
      departmentId,
    } = req.body;

    // Extract custom attributes from request
    const attribService = new CustomAttributeService(db);
    let attributes = await attribService.getAttributes();
    attributes = attributes.map((e) => camelCase(e));

    const custom = {};

    for (const attribute of attributes) {
      custom[attribute] = req.body[attribute];
    }
    // Create record
    const recordService = new EmployeeRecordService(db);

    const record = await recordService.create({
      firstName,
      middleName,
      lastName,
      maritalStatus,
      employmentType,
      jobTitle,
      paygrade,
      supervisorId,
      birthday,
      photo,
      salary,
      departmentId,
    }, {
      custom,
    });

    const addressRepo = new AddressRepository(db);
    // Code for a single address
    const {
      line1,
      line2,
      city,
      region,
      country,
    } = req.body;

    const address = {
      line1,
      line2,
      city,
      region,
      country,
    };

    await addressRepo.save(address);
    await addressRepo.addAddressToEmployee(address, record);

    //  Code to add dependent information
    dependents = [];
    for (const dependent of req.body.dependents) {
      dependents.push({
        firstName: dependent.firstName,
        middleName: dependent.middleName || '',
        lastName: dependent.lastName,
        birthday: dependent.birthday,
        relation: dependent.relation,
      });
    }

    const dependentRepo = new DependentRepository(db);
    dependentRepo.createMany(dependents);
  }
}

export default RecordController;
