var fs = require('fs')

async function writeDataOnFile(data){
  //var fileWriter = new FileWriter('common/data.dat')
  //fileWriter.open() ; 
  //fileWriter.writeLine(data) ; 
  //fileWriter.close() ;

  


  await fs.writeFile('common/data.dat', data, (err) => err && console.error(err))
  console.log("записано")
}

module.exports = writeDataOnFile