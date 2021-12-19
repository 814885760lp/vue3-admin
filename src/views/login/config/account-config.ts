export const rules = {
  name: [
    { required: true, message: '此项必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须为5到15个数字或字母',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '此项必填', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,16}$/,
      message: '密码必须为6-16位的数字或字母',
      trigger: 'blur'
    }
  ]
}
