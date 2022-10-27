let fs = require('fs');
class FileController
{
  subirArchivo = async (req, res, next) =>
  {
 
    const archivo = req.files.archivo
    const fileName = archivo.name;
 
    const path = '../pdf/' + fileName;  // ruta para local
    if (fs.existsSync(path)){
      return res.status(200).send({ status: 'success', path: './' + fileName , filename: fileName});
    } else {
      
      if (!req.files)
      return res.status(400).send('No files were uploaded.'); 
      
       archivo.mv(path, function(err) {
        if (err)
          return res.status(500).send(err);
    
          return res.status(200).send({ status: 'success', path: './' + fileName , filename: fileName});
      }) 
    }
   
     
     
  }
}

module.exports = FileController;