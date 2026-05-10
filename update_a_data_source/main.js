/**
 * 依存関係
 * - CreateElement (../components/CreateElement.js)
 * - InputText (../components/InputText.js)
 * - ExecButton (../components/ExecButton.js)
 * - OutputTable (../components/OutputTable.js)
 * - apiFetch (../utils/apiFetch.js)
 * - loadEnv (../utils/loadEnv.js)
**/

const inputSection = document.querySelector("#input");

let apiKeyInput, pageIdInput, nameInput, col1Input, col2Input, execButton;

// ========================================
// 入力
// ========================================

async function init() {
    const env = await loadEnv();

    // APIキー
    apiKeyInput = InputText({
        title: "Notion APIキー",
        value: env.NOTION_API_KEY || "",
    });

    // page_id
    pageIdInput = InputText({
        title: "Page ID",
        value: env.PAGE_ID || "",
    });

    // カラム値
    nameInput = InputText({
        title: "名前",
    });

    col1Input = InputText({
        title: "カラム１",
    });

    col2Input = InputText({
        title: "カラム２",
    });

    // ボタン
    execButton = ExecButton({
        onClick: fetchAndRenderDataSource,
    });

    // 追加
    inputSection.appendChild(apiKeyInput.el);
    inputSection.appendChild(pageIdInput.el);
    inputSection.appendChild(nameInput.el);
    inputSection.appendChild(col1Input.el);
    inputSection.appendChild(col2Input.el);
    inputSection.appendChild(execButton.el);
}

init();

// ========================================
// OUTPUT
// ========================================

const outputSection = document.querySelector("#output");

// ========================================
// PATCH実行
// ========================================

async function fetchAndRenderDataSource() {
    execButton.setLoading(true);

    const payload = {
        apiKey: apiKeyInput.getValue(),
        pageId: pageIdInput.getValue(),
        name: nameInput.getValue(),
        col1: col1Input.getValue(),
        col2: col2Input.getValue(),
    };

    try {
        const data = await apiFetch({
            url: "https://api.notion.com/v1/pages/" + payload.pageId,
            method: "PATCH",
            apiKey: payload.apiKey,
            body: formatBody(payload),
        });

        outputSection.textContent = JSON.stringify(data, null, 2);

    } catch (err) {
        outputSection.textContent = "ERROR:\n" + err;
    } finally {
        execButton.setLoading(false);
    }
}

function formatBody(payload) {
    return {
        properties: {
            名前: {
                title: [
                    {
                        text: {
                            content: payload.name,
                        },
                    },
                ],
            },
            カラム１: {
                rich_text: [
                    {
                        text: {
                            content: payload.col1,
                        },
                    },
                ],
            },
            カラム２: {
                rich_text: [
                    {
                        text: {
                            content: payload.col2,
                        },
                    },
                ],
            },
        },
    };
}