const EmployeeAccountService =
  require('../../services/employeeAccount.service');
const db = require('../../db');
/**
 *
 */
class AccountController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static create(req, res) {
    const {
      id,
      email,
      password,
    } = req.body;

    const accountService = new EmployeeAccountService(db);
    accountService.create(
        id,
        email,
        password,
    ).then(() => res.json({id, email})).catch(() => {
      res.json({error: 'error'});
    },
    );
  }
}

module.exports = AccountController;
