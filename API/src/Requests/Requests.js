function getExecPhotogrammetry(body) {
  const {exec, spawn} = require("child_process");
  exec(`D:/PDICproject/app/API/src/Requests/colmap automatic_reconstructor --image_path C:/Users/betol/Documents/Photogrammetry/Images/${body.iDFile} --workspace_path C:/Users/betol/Documents/Photogrammetry/Results/${
    body.iDFile
  } --quality low && C:/Users/betol/Documents/Photogrammetry/Results/${
    body.iDFile
  }/dense/0/fused.ply`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
        return [{
          status: "not OK"
        },];
      }
  });
  return [{
    status: "OK"
  },];
}

async function postSentImage(body) {
    var fs = require("fs");
    fs.mkdir(`C:/Users/betol/Documents/Photogrammetry/Images/${
        body.iDFile
    }`, {
        recursive: true
    }, (err) => {
        if (err) 
            throw err;
        
    });
    fs.mkdir(`C:/Users/betol/Documents/Photogrammetry/Results/${
        body.iDFile
    }/`, {
        recursive: true
    }, (err) => {
        if (err) 
            throw err;
        
    });
    fs.writeFile(`C:/Users/betol/Documents/Photogrammetry/Images/${
        body.iDFile
    }/${
        body.iDImage
    }.jpg`, body.image, "base64", function (err) {
        console.log(err);
    });

    return [{
            status: "OK"
        },];
}

module.exports = {
    getExecPhotogrammetry,
    postSentImage
};

// let {spawn} = require ('child_process'),
// file = 'D:/PDICproject/COLMAP/COLMAP.bat',
// fileExec = spawn(file,[],{shell:true});

// fileExec.stdout.on('data', (data) => {
// console.log(data.toString());
// })
// fileExec.stderr.on('data', (data) => {
// console.log('Error: '+data);
// })
// fileExec.on('close', (code) => {
// console.log('Process exit code: '+code);
// })
