async function loadHistory() {
  const res = await fetch('/history');
  const history = await res.json();

  const historyDiv = document.querySelector('tbody');

  history.forEach(entry => {
    console.log(entry)
    const tr = document.createElement('tr');
    tr.setHTMLUnsafe(`<td>${entry.id}</td><td>${entry.expression}</td><td>${entry.result}</td>`);
    historyDiv.appendChild(tr);
  });
}

window.onload = loadHistory;
