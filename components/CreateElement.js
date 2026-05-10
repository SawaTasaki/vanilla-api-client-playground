function CreateElement(tag, className, text) {
    const element  = document.createElement(tag);

    element.className = className || "";
    element.textContent = text ?? "";

    return element;
}
