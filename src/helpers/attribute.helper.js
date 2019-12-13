
/** Class providing helper methods related to attributes */
class Attribute {
/**
   * Create an EmployeeRecord object with the given data
   * @return {Object} key and database attribute name
   */
  static get attributes() {
    return {
      firstName: 'first_name',
      lastName: 'last_name',
      maritalStatus: 'marital_status',
      employmentType: 'employment_type',
      department: 'department',
      jobTitle: 'job_title',
      payGrade: 'paygrade',
      address: 'address_id',
    };
  }
}

module.exports = Attribute;

