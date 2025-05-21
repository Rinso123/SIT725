document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const display = document.getElementById("display");
  let current = "";
  display.textContent = current
  let reset = false;

  socket.on('result', (data) => {
    current = data;
    display.textContent = current;

  });

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
          socket.emit('calculate', { expression: current });
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
