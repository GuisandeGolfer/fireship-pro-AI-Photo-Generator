import "./style.css";
import { hideSpinner, showSpinner } from "./src/utils";

document.querySelector("#app").innerHTML = `
  <main>
    <h1>AI Photo Generator</h1>

    <div id="result">
      Image will go here
    </div>

    <form>
      <label for="prompt">Prompt</label>
      <textarea name="prompt" maxlength="160"></textarea>
      <button type="submit">Dream</button>
    </form>
  </main>
`;

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();

  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  if (response.ok) {
    const { image } = await response.json();

    const result = document.querySelector("#result");
    result.innerHTML = `<img src=${image} width="512" />`;
    hideSpinner();
  } else {
    const err = await response.text();
    alert(err);
    console.log(err);
  }
});
