const Router = require('express')
const router = new Router()
const templateController = require('../controllers/template.controller')

router.post('/templates', templateController.createTemplate)
router.get('/templates', templateController.getTemplateByUserId)
router.put('/templates', templateController.updateTemplate)

module.exports = router