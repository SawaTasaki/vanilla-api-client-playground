/**
 * 依存関係
 * - CreateElement (./CreateElement.js)
**/

function OutputTable(data) {

    function extractText(property) {
        if (!property) return "";

        if (property.type === "title") {
            return property.title?.[0]?.plain_text || "";
        }

        if (property.type === "rich_text") {
            return property.rich_text?.[0]?.plain_text || "";
        }

        return "";
    }

    const table = CreateElement("table", "output-table");
    table.setAttribute("border", "1");

    const rows = data.results || [];
    
    if (rows.length === 0) {
        return CreateElement("div", "", "データが０件でした。");
    }

    const headerKeys = Object.keys(rows[0].properties);

    const thead = CreateElement("thead");
    const headerRow = CreateElement("tr");

    headerKeys.forEach((key) => {
        headerRow.appendChild(CreateElement("th", "", key));
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = CreateElement("tbody");

    rows.forEach((row) => {
        const tr = CreateElement("tr");

        headerKeys.forEach((key) => {
            tr.appendChild(
                CreateElement("td", "", extractText(row.properties[key]))
            );
        });

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    return table;
}