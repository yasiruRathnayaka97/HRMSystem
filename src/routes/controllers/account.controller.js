import EmployeeAccountService from '../../services/employeeAccount.service';
import db from '../../db';
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

export default AccountController;
