const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

/* Create the Table of Contents */
(function () {
  const left = document.getElementById("toc-left");
  const bottom = document.getElementById("toc-bottom");

  if (!left && !bottom) return;

  const main =
    document.querySelector(".project-background") ||
    document.querySelector("main") ||
    document.body;

  const headings = [...main.querySelectorAll("h2, h3")];

  function slug(text) {
    return text
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function ensureId(el) {
    if (!el.id) el.id = slug(el.textContent);
    return el.id;
  }

  function build(list) {
    list.innerHTML = "";
    headings.forEach((h) => {
      const id = ensureId(h);
      const li = document.createElement("li");
      const a = document.createElement("a");

      a.href = "#" + id;
      a.textContent = h.textContent;
      a.dataset.level = h.tagName === "H3" ? "3" : "2";

      a.onclick = (e) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", "#" + id);
      };

      li.appendChild(a);
      list.appendChild(li);
    });
  }

  if (left) build(left);
  if (bottom) build(bottom);
})(); /* table of contents */

/* --------   Chatbot  ----------- */
/* to do: is this needed here or already handled by chatbox.js code */
const form = document.getElementById("chatbot-form");
const input = document.getElementById("chatbot-input");
const messages = document.getElementById("chatbot-messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Placeholder response (future backend hook)
  setTimeout(() => {
    addMessage(
      "Thanks for your question. This assistant will soon provide detailed answers about my projects and experience.",
      "bot",
    );
  }, 600);
});

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `chatbot-message ${sender}`;
  msg.innerHTML = `<p>${text}</p>`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
