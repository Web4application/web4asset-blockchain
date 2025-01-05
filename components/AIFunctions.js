import { useState } from 'react';

export default function AIFunctions() {
  const [prompt, setPrompt] = useState('');
  const [functionType, setFunctionType] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, functionType }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div>
      <h1>AI Functions</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
        />
        <select value={functionType} onChange={(e) => setFunctionType(e.target.value)}>
          <option value="">Select Function</option>
          <option value="predictiveAnalytics">Predictive Analytics</option>
          <option value="marketAnalysis">Market Analysis</option>
          <option value="automatedTrading">Automated Trading</option>
          <option value="fraudDetection">Fraud Detection</option>
          <option value="sentimentAnalysis">Sentiment Analysis</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
