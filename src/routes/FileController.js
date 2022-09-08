
class FileController
{
  subirArchivo = async (req, res, next) =>
  {
  /*   if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
    const path = '/var/www/pdf/' + sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  }); */
    const archivo = req.files
    const fileName = archivo.name;
    const path = '/var/www/pdf/' + fileName;
    console.log(path)
    if (!req.files)
    return res.status(400).send('No files were uploaded.');
    
    archivo.mv(path, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    })
     
     
  }
}

module.exports = FileController;