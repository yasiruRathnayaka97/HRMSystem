const JobTitleRepository =require('../repositories/jobTitle.repository');
const EmployeeAccount = require('../models/employeeRecord.model'); //please check this one


class AdminService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  async addJobTitle(job) {

    const jobRepo = new JobTitleRepository(this.db);

    await jobrepo.create({
      job
    });

    return new JobTitle(
        job
    );
  }
  async removeJobTitle(job) {

    const jobRepo = new JobTitleRepository(this.db);

    await jobrepo.delete({
      job
    });
  }
}

module.exports = AdminService;
