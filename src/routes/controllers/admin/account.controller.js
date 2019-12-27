const changeService = require('../../../services/job.service');
const db = require('../../../db');

class adminAccountController{
    static changeJob= (res,req,next)=>{
        const cService = new changeService(db);
        const job= req.body.job;
        cService.changeJob(job);
        res.render('/changedjob',{
            pageTitle: 'Changed',
            job: job
        });        
    };
}