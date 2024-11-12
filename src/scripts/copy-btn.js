const codeBlocks = document.querySelectorAll("pre");
codeBlocks.forEach(function (codeBlock) {
  const codeDiv = document.createElement("div");
  codeDiv.className = "flex justify-end code-block";
  const copyBtn = document.createElement("button");
  copyBtn.innerText = "Copy";
  copyBtn.classList.add("copy-btn");

  copyBtn.addEventListener("click", function () {
    const text = codeBlock.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        copyBtn.innerText = "Copied!";
        setTimeout(() => (copyBtn.innerText = "Copy"), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  });

  codeDiv.appendChild(copyBtn);
  codeBlock.parentElement?.insertBefore(codeDiv, codeBlock);
});
