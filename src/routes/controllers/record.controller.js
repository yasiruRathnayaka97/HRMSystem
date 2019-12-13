
import db from '../../db';
import EmployeeRecordService from '../../services/employeeRecord.service';
import CustomAttributeService from
  '../../services/customAttribute.service';
import camelCase from 'lodash';
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

    recordService.create({
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
    }).then((record) =>{
      return res.json(record);
    }).catch((err) =>{
      return res.json({err: error});
    });
  }
}

export default RecordController;
