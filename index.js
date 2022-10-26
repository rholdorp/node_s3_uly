const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const upload = async (appendData) => {
  const params = {
    Body: appendData,
    ContentType: "text/html",
    Bucket: "ndbrgrd-ws-data",
    Key: "testfile.txt",
  };
  return await new Promise((resolve, reject) => {
    s3.putObject(params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const read = async () => {
  const params = {
    Bucket: "ndbrgrd-ws-data",
    Key: "testfile.txt",
  };
  return await new Promise((resolve, reject) => {
    s3.getObject(params, (err, results) => {
      if (err) reject(err);
      else resolve(results.Body.toString());
    });
  });
};

const main = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Ack from the lambda"),
  };
  try {
    let updatedInput = "";
    let readRes = await read();
    updatedInput = readRes + "--<br>" + event.body;
    upload(updatedInput);
  } catch (e) {
    console.log("Error:" + e);
    const response = {
      statusCode: 500,
      body: JSON.stringify("S3 read failed"),
    };
  }
  return response;
};
exports.handler = main;
