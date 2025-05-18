
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  let current = "";
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
          try {
            current = eval(current).toString();
          } catch (e) {
            current = "";
            display.textContent = "Error";
            return;
          }
          display.textContent = current;
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
