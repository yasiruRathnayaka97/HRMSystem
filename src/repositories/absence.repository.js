const BaseRepository = require('../db/common/baseRepository');

/**
 * Absence Repository
 */
class AbsenceRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'absence');
  }
//new function if want can add to baseRepo or use another func as choise 
/**
   *
   * @param {string} attribute
   * @param {string||int} value
   */
  async findOneByOne(attribute,value){
     const sql=`select status from ${this.table} where ${attribute}=?`;
     return await this.db.execute(sql,[value]).then((result)=>{
        console.log( result[0]);
        return result[0];
     });
  }
}

module.exports = AbsenceRepository;
