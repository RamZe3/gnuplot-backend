const db = require('../db')
const gnuplotting = require("../common/plottingLogic");

class TemplateService{
    async createTemplate(template){
        const newTemplate = await db.query('INSERT INTO templates ' +
            '(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, p_script,  user_id) ' +
            'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
            [template.title,
                template.x_range_l, template.x_range_r, template.y_range_l, template.y_range_r,
                template.x_tics, template.y_tics,
                template.func,
                template.grid, template.p_script,
                template.user_id])
        return newTemplate.rows[0]
    }

    async plotTemplate(template){
        let href = await gnuplotting(template)
        return href
    }

    async plotTemplateById(id){
        const template = await db.query('SELECT * FROM templates WHERE id= $1', [id])
        let href = await gnuplotting(template.rows[0])
        return href
    }

    async getTemplateByUserId(id){
        const templates = await db.query('SELECT * FROM templates WHERE user_id= $1', [id])
        return templates.rows
    }

    async updateTemplate(template){
        const uTemplate = await db.query('UPDATE templates set title= $1, x_range_l= $2, x_range_r= $3, y_range_l= $4,' +
            'y_range_r= $5, x_tics= $6, y_tics= $7, func= $8, grid= $9, p_script= $10, user_id= $11  where id = $12 RETURNING *',
            [template.title,
                template.x_range_l, template.x_range_r, template.y_range_l, template.y_range_r,
                template.x_tics, template.y_tics,
                template.func,
                template.grid, template.p_script,
                template.user_id, template.id])
        return uTemplate.rows[0]
    }
}

module.exports = new TemplateService()