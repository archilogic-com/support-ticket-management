const express = require('express');
var cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const proxy = createProxyMiddleware({
    target: 'https://api.archilogic.com',
    changeOrigin: true,
    onProxyReq: onProxyReq,
    logLevel: 'debug'
});

app.use(cors({
    origin: '*'
}));

app.use('/', proxy);

function onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader('x-secret-api-key', '09039317-d9f3-4a00-ae3c-968d36002d57');
    proxyReq.removeHeader('Origin')
}

app.listen(3000);
