const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const upload = async (appendData) => {
   const params = {
       Body: appendData,
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

const read = async () => {
    const params = {
        Bucket: 'ndbrgrd-ws-data',
        Key: 'testfile.txt'
    } 
     return await new Promise((resolve, reject) => {
         s3.getObject(params, (err, results) => {
            if(err) reject(err);
            else resolve(results.Body.toString());             
         });
    });
}

const main = async(event) => {
    let updatedInput = '';
    let readRes = await read();
    console.log("Read output:" + readRes);
    updatedInput = readRes+'--<br>';
    upload(updatedInput);
};
exports.handler = main;