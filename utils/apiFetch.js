async function apiFetch({
    url,
    method = "GET",
    apiKey,
    headers = {},
    body,
}) {
    const options = {
        method,
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Notion-Version": "2026-03-11",
            "Content-Type": "application/json",
            ...headers,
        },
        body: body != null ? JSON.stringify(body) : undefined,
    };

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return await res.json();
}
