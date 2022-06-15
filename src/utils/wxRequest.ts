const wxRequest = new cloud.Cloud({
  identityless: true,
  resourceAppid: 'wxbefc206d7f2ad46c', // 替换成自己的
  resourceEnv: 'naniwan-dev-4g500api29100d96', // 替换成自己的
})
wxRequest.init()

export default wxRequest
