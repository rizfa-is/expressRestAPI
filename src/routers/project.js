const { Router } = require('express')
const { getAllProject, deleteProject } = require('../controllers/project')
const router = Router()

router.get('/', getAllProject)
router.delete('/:projectId', deleteProject)

module.exports = router
