var express = require('express');
var router = express.Router();
const jobController = require('../controllers/jobController');
const { body } = require('express-validator');

// GET users listing(done)
router.get('/', jobController.jobs_list);

// POST jobs delete(done) 
router.post('/:id/delete', jobController.jobs_delete_post);

// GET jobs view(done)
router.get('/:id', jobController.job_detail);

// GET user jobs(done)
router.get('/:id/list', jobController.user_job_get);

// POST Jobs add(done) 
router.post('/', jobController.jobs_create_post);

// POST jobs edit
router.post('/:id/edit', jobController.jobs_edit_post);

module.exports = router;
