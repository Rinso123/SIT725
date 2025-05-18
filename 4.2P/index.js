const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { logCalculation, getHistory } = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/past-calculations', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'past-calculations.html'));
});

// Safe expression evaluator (basic + limited)
function evaluateExpression(expr) {
  if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
    throw new Error('Invalid characters in expression');
  }

  const result = eval(expr); // Note: use with extreme caution in production
  return result;
}

app.post('/calculate', async (req, res) => {
  console.log(req.body);
  const { expression } = req.body;

  if (!expression) {
    return res.status(400).json({ error: 'Missing expression' });
  }

  try {
    const result = evaluateExpression(expression);
    await logCalculation(expression, result);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.get('/history', async (req, res) => {
  try {
    const history = await getHistory();
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Calculator running at http://localhost:${PORT}`);
});
