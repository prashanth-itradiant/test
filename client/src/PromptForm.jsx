import axios from "axios";
import { useState } from "react";

const PromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [openaiResponse, setOpenaiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeminiResponse("");
    setOpenaiResponse("");
    try {
      const res = await axios.post("http://localhost:8000/api/prompt", {
        prompt,
      });
      setGeminiResponse(res.data.gemini);
      setOpenaiResponse(res.data.openai);
    } catch (error) {
      setGeminiResponse("Error: " + error.message);
      setOpenaiResponse("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Submit Prompt"}
        </button>
      </form>

      {(geminiResponse || openaiResponse) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded bg-gray-100 whitespace-pre-wrap">
            <strong>Gemini Response:</strong>
            <div>{geminiResponse}</div>
          </div>
          <div className="p-4 border rounded bg-gray-100 whitespace-pre-wrap">
            <strong>OpenAI Response:</strong>
            <div>{openaiResponse}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
