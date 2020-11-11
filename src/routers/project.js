const { Router } = require('express')
const { getAllProject, getProjectById, createProject, deleteProject, updateProject, parsialUpdateProject } = require('../controllers/project')
const router = Router()

router.get('/', getAllProject)
router.get('/:projectId', getProjectById)
router.post('/', createProject)
router.delete('/:projectId', deleteProject)
router.put('/:projectId', updateProject)
router.patch('/:projectId', parsialUpdateProject)

module.exports = router
