async function loadEnv() {
    try {
        const response = await fetch('../.env');
        const text = await response.text();
        const env = {};
        text.split('\n').forEach(line => {
            const [key, value] = line.split('=');
            if (key && value) env[key.trim()] = value.trim();
        });
        return env;
    } catch (e) {
        console.error('Failed to load .env', e);
        return {};
    }
}
