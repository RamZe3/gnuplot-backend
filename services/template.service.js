const db = require('../db')
const gnuplotting = require("../common/plottingLogic");
const newGuid = require("../common/GuidLogic");
//const { newGuid } = require('../common/GuidLogic');

class TemplateService{
    async createTemplate(template){
        console.log("create")
        console.log(template.file_data)
        const newTemplate = await db.query('INSERT INTO templates ' +
            '(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script, user_id, creation_date, invite_str, ' +
                'func3d, z_range_l, z_range_r, z_label, zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data) ' +
            'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP, $16,' +
                '$17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28) RETURNING *',
            [template.title,
                template.x_range_l, template.x_range_r, template.y_range_l, template.y_range_r,
                template.x_tics, template.y_tics,
                template.func,
                template.grid,
                template.x_label, template.y_label,
                template.width, template.height,
                template.p_script,
                template.user_id,
                newGuid(),

                template.func3d,
                template.z_range_l,
                template.z_range_r,
                template.z_label,
                template.zeroaxis,
                template.color,
                template.wigth,
                template.points_type,
                template.plot_type,
                template.border,
                template.z_tics,
                template.file_data,
                ])
        return newTemplate.rows[0]
    }

    async plotTemplate(template){
        console.log("plot")
        //console.log(template.file_data)
        let href = await gnuplotting(template)
        return href
    }

    async plotTemplateById(id){
        console.log("plotbyid " + id)
        if(id === "" || id === undefined || id === null || id === 'undefined'){
            console.log("успех")
            return ""
        }
        else{
            const template = await db.query('SELECT * FROM templates WHERE id= $1', [id])
            let href = await gnuplotting(template.rows[0])
            return href
        }
        
    }

    async getTemplateByUserId(id){
        console.log("getbyuserr")
        if (id === "null" || id === ""){
            return ''
        }
        else {
            const templates = await db.query('SELECT * FROM templates WHERE user_id= $1', [id])
            return templates.rows
        }
    }

    async createTemplateByInviteStr(invite_str, user_id){
        console.log("createnew servise + " + invite_str + "     " + user_id)
        const template = await db.query('SELECT * FROM templates WHERE invite_str= $1', [invite_str])
        //template = template.rows[0]
        console.log(template.rows[0])

        var current_template = template.rows[0]
        console.log("a" + current_template.user_id + "a" + user_id + "a")
        //console.log(current_template.user_id == user_id)
        //console.log(current_template.user_id === user_id)
        if(current_template === undefined || current_template.user_id == user_id){
            console.log('ошибка')
            return
        }
        console.log("Ошибки нет")

        const newTemplate = await db.query('INSERT INTO templates ' +
        '(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script, user_id, creation_date, invite_str, ' +
        'func3d, z_range_l, z_range_r, z_label, zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data) ' +
    'values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, CURRENT_TIMESTAMP, $16,' +
        '$17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28) RETURNING *',
            [current_template.title,
                current_template.x_range_l, current_template.x_range_r, current_template.y_range_l, current_template.y_range_r,
                current_template.x_tics, current_template.y_tics,
                current_template.func,
                current_template.grid,
                current_template.x_label, current_template.y_label,
                current_template.width, current_template.height,
                current_template.p_script,
                user_id,
                newGuid(),
                
                current_template.func3d,
                current_template.z_range_l,
                current_template.z_range_r,
                current_template.z_label,
                current_template.zeroaxis,
                current_template.color,
                current_template.wigth,
                current_template.points_type,
                current_template.plot_type,
                current_template.border,
                current_template.z_tics,
                current_template.file_data,
            ])
            return newTemplate.rows[0]
    }

    //TODO с новыми полями
    async updateTemplate(template){
        console.log("update")
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