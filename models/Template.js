class Template{
    constructor(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id) {
        this.id = id
        this.title = title
        this.x_range_l = x_range_l
        this.x_range_r = x_range_r
        this.y_range_l = y_range_l
        this.y_range_r = y_range_r
        this.x_tics = x_tics
        this.y_tics = y_tics
        this.func = func
        this.grid = grid
        this.x_label = x_label
        this.y_label = y_label
        this.width = width
        this.height = height
        this.p_script = p_script
        this.user_id = user_id
        this.creation_date = creation_date
        this.invite_str = invite_str
    }
}

module.exports = Template