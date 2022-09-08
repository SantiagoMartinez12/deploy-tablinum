
class FileController
{
  subirArchivo = async (req, res, next) =>
  {
    if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
    const path = '/var/www/pdf/' + sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
   /*  const archivo = req.files
    console.log(req.files)
    
    const fileName = archivo.name;
    const path = '../pdf/' + fileName;
    console.log(path)
    try {
      archivo.mv(path, (error) => {
        if (error) {
          console.error(error);
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({ status: 'error', message: error }));
            return;
          }
          return res.status(200).send({ status: 'success', path: './' + fileName , filename: fileName});
       });
     } catch (e) {
       res.status(500).json({
         error: true,
         message: e.toString()
       });
     }  */
  }
}

module.exports = FileController;