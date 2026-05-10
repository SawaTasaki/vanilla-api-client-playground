/**
 * 依存関係
 * - CreateElement (./CreateElement.js)
**/

function InputText({
    title,
    description = "説明文が入ります。",
    type = "text",
    value = "",
}) {

    const root = CreateElement("div", "input-text");

    const label = CreateElement("label", "input-text__label", title);
    label.style.fontWeight = "600";
    label.style.fontSize = "14px";

    const input = CreateElement("input", "input-text__input");
    input.type = type;
    input.value = value;

    const desc = CreateElement("p", "input-text__description", description);
    desc.style.fontSize = "12px";
    desc.style.color = "#666";
    desc.style.marginTop = "4px";

    root.append(label, input, desc);

    return {
        el: root,
        getValue: () => input.value,
        setValue: (v) => input.value = v
    };
}
