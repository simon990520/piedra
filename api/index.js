export default async function handler(req, res) {
    const BACKENDS = [
        "https://mano-production.up.railway.app",
        "https://mano-production-474e.up.railway.app"
    ];

    for (const backend of BACKENDS) {
        try {
            console.log(`Checking: ${backend}`);
            const response = await fetch(backend + '/', { method: 'HEAD' });

            if (response.status < 500) {
                // Found alive backend, redirect user there
                // Note: This changes the URL in the browser bar
                const destination = new URL(req.url, backend).toString();
                console.log(`Redirecting to: ${destination}`);
                res.status(307).redirect(destination);
                return;
            }
        } catch (e) {
            console.error(`Failed ${backend}: ${e.message}`);
        }
    }

    res.status(503).send('All servers are down.');
}
