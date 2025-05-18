
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let current = "";
  display.textContent = current
  let reset = false;

  // Handle all button clicks
  document.querySelectorAll(".btn-flat").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.textContent.trim();

      switch (value) {
        case "C":
          current = "";
          display.textContent = "0";
          break;
        case "DEL":
          current = current.slice(0, -1);
          display.textContent = current || "0";
          break;
        case "=":
          fetch("/calculate", {
            method: "POST",
            body: JSON.stringify({ expression: display.textContent }),
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
            res.json().then((data) => {
              current = data.result;
              display.textContent = current;
            });
          }).catch(() => {

            current = "";
            display.textContent = "Error";
          });
          break;
        default:
          if (reset) {
            current = "";
            reset = false;
          }
          current += value;
          display.textContent = current;
      }
    });
  });
});
