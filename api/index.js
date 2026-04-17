const http = require('http');

export default function handler(req, res) {
    const options = {
        hostname: '5.75.193.168',
        port: 80,
        path: '/darbasti',
        method: req.method,
        headers: {
            'Host': '5.75.193.168', // اجباری برای شناسایی در مقصد
            'Connection': 'upgrade', // برای حمایت از وب‌سوکت
            'Upgrade': 'websocket'
        }
    };

    const proxy = http.request(options, (targetRes) => {
        res.writeHead(targetRes.statusCode, targetRes.headers);
        targetRes.pipe(res);
    });

    req.pipe(proxy);

    proxy.on('error', (e) => {
        console.error("Vercel Proxy Error:", e.message);
        res.status(502).json({ error: "Gateway Error", details: e.message });
    });
}
