const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware(['/api', '/api/newpost'],{
      target: "http://localhost:4000",
      changeOrigin: true
    })
  )
}