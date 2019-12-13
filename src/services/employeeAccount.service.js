import EmployeeAccountRepository from
  '../repositories/employeeAccount.repository';
import EmployeeAccount from
  '../models/employeeRecord.model';

/**
 * Employee Account Service
 */
/**
 *
 */
class EmployeeAccountService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} employeeRecordId
   * @param {*} email
   * @param {*} password
   */
  async create(employeeRecordId, email, password) {
    // hash password

    const accountRepo = new EmployeeAccountRepository(this.db);

    await accountRepo.create({
      id: employeeRecordId,
      email,
      password,
    });

    return new EmployeeAccount(
        employeeRecordId,
        email,
        password,
    );
  }
}

export default EmployeeAccountService;
