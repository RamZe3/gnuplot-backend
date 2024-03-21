var fs = require('fs')
var gnuplot = require('gnuplot');
const moment = require('moment');
const path = require('path')
const {set} = require("express/lib/application");
const Template = require('../models/Template');
const writeDataOnFile = require("../common/FileDataLogic");

function plotType2D(data){
    const words1 = data.split('\n');
    const words = words1[0].split(' ');
    if(words.length > 2){
       return false
    }
    else{
      return true
    }
  }

  function generateStyles(template){
    var styles = ' '
    if(template.plot_type !== ''){
        styles+= 'with ' + template.plot_type + ' '
    }
    if(template.color !== ''){
        styles+= 'lc rgb \"' + template.color + '\" '
    }
    if(template.points_type !== ''){
        styles+= 'lt ' + template.points_type + ' '
    }
    if(template.wigth !== ''){
        styles+= 'lw ' + template.wigth + ' '
    }

    return styles
  }

  function generatePlot(template){
    var plotSTR = ' '
    if(template.file_data !== ''){
        if(plotType2D(template.file_data)){
            console.log("2d graf p")
            plotSTR = 'plot ' + '\'common/data.dat\''
        }
        else{
            console.log("3d graf p")
            plotSTR = 'splot ' + '\'common/data.dat\''
        }
        return plotSTR
    }
    if(template.func3d !== ''){
        plotSTR = 'splot ' + template.func3d
        return plotSTR
    }
    if(template.func !== ''){
        plotSTR = 'plot ' + template.func
        return plotSTR
    }

    return plotSTR
  }

async function gnuplotting(template){

    const styles = generateStyles(template)
    const plotstr = generatePlot(template)

    if(template.file_data !== ''){
        writeDataOnFile(template.file_data)
    }
    
    var data = fs.createReadStream('common/data.dat')
    //writeDataOnFile('2 2 3\n3 3 2\n4 4 5')
    //console.log('file ' + plotType2D('2 2 2\n3 3\n4 4'))
    console.log('border' + template.border)

    if(template.p_script !== ''){
        console.log(template.p_script + " script")
        let now = moment().format('YYYY_MM_DD_hh_mm_ss');
        await gnuplot()
            .set('terminal png size 600,480 font \"arial,12.0\"')
            .set("style data histograms\n" + template.p_script)
            .pipe(fs.createWriteStream( './plot/' + now + '.png'));
        let path1 = path.resolve('./plot/' + now + '.png')

        console.log(template.grid + "grid")

        return "http://localhost:8080/plot/" + now + '.png'
    }

    let now = moment().format('YYYY_MM_DD_hh_mm_ss');
    //(template.x_range_l !== null && template.x_range_r !== null) ? gnuplot().set('xrange [$1:$2]', [template.x_range_l, template.x_range_r]) : console.log("ASF");
    //(template.y_range_l !== null && template.y_range_r !== null) ? gnuplot().set('yrange [$1:$2]', [template.x_range_l, template.x_range_r]) : "";
    (template.x_tics !== null) ? gnuplot().set('xtics $1', [template.x_tics]) : "";
    (template.y_tics !== null) ? gnuplot().set('ytics $1', [template.y_tics]) : "";
    (template.z_tics !== null) ? gnuplot().set('ztics $1', [template.z_tics]) : "";
    //(template.x_label !== null) ? gnuplot().set('xlabel  \'$1\'', [template.x_label]) : "";
    //(template.y_label !== null) ? gnuplot().set('ylabel \'$1\'', [template.y_label]) : "";

    console.log(template.grid + " grid12")
    console.log(template.grid !== 'true')
    if (template.grid){
        //template.grid = ''
        console.log(typeof template.grid)
    }
    else{
        console.log('не успех')
    }
    let func = template.func
    //let func = ''
    //template.func.forEach(e => func += e + ', ' )
    //func = func.slice(0, -2)

    console.log(template.width + " " + template.height + "mesto")
    //gnuplot().pipe(fs.createReadStream(data));
    //await data.pipe(gnuplot().pipe(fs.createWriteStream( './plot/' + now + '.png')));

    //let path12 = path.resolve('./plot/' + now + '.png')
    
    //return "http://localhost:8080/plot/" + now + '.png'
    await gnuplot()
        .set('terminal png size ' + template.width + ',' + template.height + ' font \"arial,12.0\"',)
        .set("style data histograms")
        //.set('style func linespoints')
        .set("title \'" + template.title + "\'")
        .set('xlabel  \'' + template.x_label + '\'')
        .set('ylabel  \'' + template.y_label + '\'')
        .set('zlabel  \'' + template.y_label + '\'')
        .set('xrange [' + template.x_range_l +':' + template.x_range_r + ']')
        .set('yrange [' + template.y_range_l +':' + template.y_range_r + ']')
        .set('zrange [' + template.y_range_l +':' + template.y_range_r + ']')
        //.set(template.grid ? "grid" : "asd")
        .set('xtics  \'' + template.x_tics + '\'')
        .set('ytics  \'' + template.y_tics + '\'')
        .set('ztics  \'' + template.z_tics + '\'')
        //.set('ztics  \'' + template.z_tics + '\'')
        //.set("zeroaxis")
        .set((template.grid) ? "grid" : "")
        .unset((template.grid !== 'true') ? "grid" : "")
        .set((template.zeroaxis) ? "zeroaxis" : "")
        .unset((template.zeroaxis !== 'true') ? "zeroaxis" : "")
        .set((template.border) ? "border" : "")
        .unset((template.border !== 'true') ? "border" : "")

        //.set('palette defined ( 0 \"blue\", 1 \"red\" )')
        //.show('style line')
        
        //.set('xtics 2')

        //.set('zeroaxis\nset style line 1 lt 2 lc rgb "red" lw 3\nshow style line')
        
        
        
        //.set('label 3 center')
        
        
        //.unset('key\n' + 'plot ' + func + styles, {end: true})

        .unset('key\n' + plotstr + " " + styles, {end: true})


        //.splot('\'common/data.dat\'', {end: true})
        //.plot('\'common/data.dat\'' + " with lines", {end: true})
        //.plot('\'common/data.dat\'', {end: true})
        

        //.plot('\'common/data.dat\'' +  'ls 1', {end: true})
        //.unset('border')
        //.plot(func +  'with linespoints lt 3 lc 3 title \'lt 3 lc 3\'', {end: true})
        
        //lc -linecolor lw - linewigth lt - point type

        //.plot(func + ' with points lc rgb "red"' +  ' lw 4' + ' lt 6', {end: true})
        //.plot(func +' lc 1' + '', {end: true})
        //.plot(func + styles, {end: true})
        .pipe(fs.createWriteStream( './plot/' + now + '.png'));


    let path1 = path.resolve('./plot/' + now + '.png')

    //return path1.replaceAll('\\', "/")
    //TODO
    return "http://localhost:8080/plot/" + now + '.png'
}

module.exports = gnuplotting