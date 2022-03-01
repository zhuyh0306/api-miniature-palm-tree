const Core = require('@alicloud/pop-core');

var client = new Core({
  accessKeyId: 'LTAI5tRjqtG6hM16mECuXKqT',
  accessKeySecret: 'iwytvAdin1RVMvVTndbaJbGtnmXpRV',
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
});

var params = {
  PhoneNumbers: '15140848376', //接收短信的手机号码
  SignName: '阿里云短信测试', //短信签名名称
  TemplateCode: 'SMS_154950909', //短信模板CODE
  templateParam: '{"code":"1234"}'
};

function sendMsg() {
  var requestOption = {
    method: 'POST'
  };

  client.request('SendSms', params, requestOption).then(
    result => {
      console.log(JSON.stringify(result));
    },
    ex => {
      console.log(ex);
    }
  );
}
module.exports = {
  sendMsg
};
