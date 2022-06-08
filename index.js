const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const upload = async () => {
   const params = {
       ACL: 'public-read',
       Body: 'Hey Ralph en Frank',
       ContentType: 'text/html',
       Bucket: 'ndbrgrd-ws-data',
       Key: 'testfile.txt'
   } 

   return await new Promise((resolve, reject) => {
       s3.putObject(params, (err, results) => {
           if(err) reject(err);
           else resolve(results);
       });
   });
}

const main = async(event) => {
    return upload();
};

exports.handler = main;