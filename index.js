const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const upload = async (originalData) => {
   const params = {
       ACL: 'public-read',
       Body: originalData + 'Hey Ralph en Frank',
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
        ACL: 'public-read',
        Bucket: 'ndbrgrd-ws-data',
        Key: 'testfile.txt'
    } 
     return await new Promise((resolve, reject) => {
         s3.getObject(params, (err, results) => {
            if(err) reject(err);
            else resolve(results);             
         });
    });
}

const main = async(event) => {
    var r = await read().then((e,r) =>{
        console.log("error,result="+ e,r);
    });
    console.log(r);
    return upload(r);
};

exports.handler = main;