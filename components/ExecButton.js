/**
 * 依存関係
 * - CreateElement (./CreateElement.js)
**/

function ExecButton({ onClick }) {
    const element = CreateElement("button", "run-button", "実行！");

    element.addEventListener("click", onClick);

    return {
        el: element,

        setLoading(isLoading) {
            element.disabled = isLoading;
            element.textContent = isLoading ? "実行中..." : "実行！";
        },
    };
}