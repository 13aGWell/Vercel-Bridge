const http = require('http');

export default function handler(req, res) {
    const options = {
        hostname: '5.75.193.168',
        port: 80,
        path: '/darbasti',
        method: req.method,
        headers: {
            ...req.headers,
            host: '5.75.193.168'
        }
    };

    const proxy = http.request(options, (targetRes) => {
        res.writeHead(targetRes.statusCode, targetRes.headers);
        targetRes.pipe(res);
    });

    req.pipe(proxy);
    proxy.on('error', (e) => res.status(502).end(e.message));
}
