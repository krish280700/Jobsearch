const jobRepo = require('../lib/jobsRepo.js');
const { validationResult } = require('express-validator');

/* GET jobs listing. */
exports.jobs_list = async function(req, res, next) {
    const data = await jobRepo.findAll();
    res.json({msg:"Success" ,jobs: data });
};


/* GET a job */
exports.job_detail = async function(req, res, next) {
    const job = await jobRepo.findById(req.params.id);
    if (job) {
      res.json({job: job});
    } else {
      res.json({msg: 'Something Went Wrong'});
    }
};

/* GET user job */
exports.user_job_get = async function(req, res, next) {
    const job = await jobRepo.findByUserId(req.params.id);
    res.json({job: job});
};

/* POST jobs delete */
exports.jobs_delete_post = async function(req, res, next) {
    await jobRepo.deleteById(req.params.id);
    res.json({msg: "Successfully Deleted"});
};

/* POST job add */
exports.jobs_create_post = async function(req, res, next) {
    const result = validationResult(req.body);

    if (!result.isEmpty()) {
        res.json({msg: result.array()});
    } else {
        await jobRepo.create(req.body);
        res.json({msg: "Job Successfully uploaded"});
    }
};

// Post movie edit
exports.jobs_edit_post = async function(req, res, next) {
    const result = validationResult(req.body);
    if (!result.isEmpty()) {
        const user = await jobRepo.findById(req.params.id);
        res.json({msg: result.array()});
    }else{
        await jobRepo.update(req.body);
        res.json({msg: "Successfully Updated"});
    }   
};