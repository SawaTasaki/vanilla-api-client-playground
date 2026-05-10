## ■ 目的
制約下で条件を満たすAPIクライアントUIを作る。


## ■ 制約

- フレームワーク禁止
  - 素の HTML / JS のみ使用
- CORS設定禁止
  - 開発時はCORS制限を無効化したChromeで動作確認を行う
  - `start chrome --disable-web-security --user-data-dir="C:\chrome-dev"`
- サーバ起動禁止
  - 開発時は `file://~` からHTMLファイルを直接開いて実行。HTTPサーバ（localhostなど）は禁止
  - 運用時は GitHub Pages による静的ホスティングを使用する
  - そのため `type="module"`（ES Modules）、`import` / `export` 構文は使用不可

---

## ■ 条件

- セキュリティに注意
  - XSS対策として `innerHTML` の使用は禁止し、`textContent` / DOM API による構築を行う
- コードの保守性を高める
  - UIは関数ベースのコンポーネント風構造で分割する

## ■ 参考文献

- Fetch API  
  https://developer.mozilla.org/ja/docs/Web/API/Fetch_API

- Using Fetch  
  https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

- Element.innerHTML  
  https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

- Node.textContent  
  https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent

- HTMLElement.innerText  
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
