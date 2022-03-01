const fs = require('fs');
let OSS = require('ali-oss');
let path = require('path');

let ossClient = new OSS({
  region: 'oss-cn-qingdao',
  accessKeyId: 'LTAI5tRjqtG6hM16mECuXKqT',
  accessKeySecret: 'iwytvAdin1RVMvVTndbaJbGtnmXpRV',
  bucket: 'miniatura-palm'
});

module.exports = ossClient;
