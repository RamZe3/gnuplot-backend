const db = require('../db')

class TemplateService{
    async createTemplate(template){
        const newTemplate = await db.query('INSERT INTO templates (title, user_id) values ($1, $2) RETURNING *',
            [template.title, template.user_id])
        return newTemplate.rows[0]
    }

    async getTemplateByUserId(id){
        const templates = await db.query('SELECT * FROM templates WHERE user_id= $1', [id])
        return templates.rows
    }

    async updateTemplate(template){
        const uTemplate = await db.query('UPDATE templates set title = $1 where id = $2 RETURNING *',
            [template.title, template.id])
        return uTemplate.rows[0]
    }
}

module.exports = new TemplateService()