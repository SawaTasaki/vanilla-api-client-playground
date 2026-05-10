/**
 * 依存関係
 * - CreateElement (../components/CreateElement.js)
 * - InputText (../components/InputText.js)
 * - ExecButton (../components/ExecButton.js)
 * - OutputTable (../components/OutputTable.js)
 * - apiFetch (../utils/apiFetch.js)
 * - loadEnv (../utils/loadEnv.js)
**/

// ========================================
// 入力エリア
// ========================================

const inputSection = document.querySelector("#input");

let apiKeyInput, dataSourceInput, execButton;

async function init() {
    const env = await loadEnv();

    // NotionAPIキー入力欄
    apiKeyInput = InputText({
        title: "Notion APIキー",
        description: "Internal Integration Token を入力",
        value: env.NOTION_API_KEY || "",
    });

    // データソースID入力欄
    dataSourceInput = InputText({
        title: "データソースID",
        description: "Query対象のデータソースID",
        value: env.DATA_SOURCE_ID || "",
    });

    // 実行ボタン欄
    execButton = ExecButton({
        onClick: fetchAndRenderDataSource,
    });

    inputSection.appendChild(apiKeyInput.el);
    inputSection.appendChild(dataSourceInput.el);
    inputSection.appendChild(execButton.el);
}

init();


// ========================================
// API実行関数＋出力エリア
// ========================================

const outputSection = document.querySelector("#output");

async function fetchAndRenderDataSource() {
    execButton.setLoading(true);

    const payload = {
        apiKey: apiKeyInput.getValue(),
        dataSourceId: dataSourceInput.getValue(),
    };

    try {
        const data = await apiFetch({
            url:
                "https://api.notion.com/v1/data_sources/" +
                payload.dataSourceId +
                "/query",
            method: "POST",
            apiKey: payload.apiKey,
            body: {},
        });

        const tableEl = OutputTable(data);
        while (outputSection.firstChild) {
            outputSection.removeChild(outputSection.firstChild);
        }
        outputSection.appendChild(tableEl);
    } catch (err) {
        outputSection.textContent = "ERROR:\n" + err;
    } finally {
        execButton.setLoading(false);
    }
}
