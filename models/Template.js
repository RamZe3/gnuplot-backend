class Template{
    constructor(title, x_range_l, x_range_r, y_range_l, y_range_r, x_tics, y_tics, func, grid, x_label, y_label, width, height, p_script,  user_id, creation_date, invite_str, id
        ,func3d, z_range_l, z_range_r,z_label,zeroaxis, color, wigth, points_type, plot_type, border, z_tics, file_data
        ) {
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

        this.func3d= func3d
        this.z_range_l= z_range_l
        this.z_range_r= z_range_r
        this.z_label=   z_label
        this.zeroaxis=      zeroaxis
        this.color=   color
        this.wigth=   wigth
        this.points_type= points_type
        this.plot_type= plot_type
        this.border= border
        this.z_tics=    z_tics
        this.file_data= file_data
    }
}

module.exports = Template