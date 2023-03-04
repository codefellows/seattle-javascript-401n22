import { useCallback, useState } from "react";

const makeOpenAiRequest = async (content: string): Promise<string> => {
  const org = process.env.REACT_APP_OPENAI_ORG;
  const key = process.env.REACT_APP_OPENAI_KEY;
  const url = "https://api.openai.com/v1/chat/completions";

  const message = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content }],
  };

  const body = JSON.stringify(message);

  // make fetch happen
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "OpenAI-Organization": `${org}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson.choices[0].message.content;
  } else {
    const error = await response.text();
    return `${response.status} ${response.statusText} ${error}`;
  }
};

export const OpenAI = () => {
  const [prompt, setPrompt] = useState("What are salmon cookies?");
  const [chat, setChat] = useState("");

  const makeFetchHappen = useCallback(async () => {
    const response = await makeOpenAiRequest(prompt);
    setChat(response);
  }, [prompt]);

  return (
    <>
      <h2>OpenAI</h2>
      <label>
        Ask Chat:
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </label>
      <button onClick={makeFetchHappen}>Chat!</button>
      <div>{chat}</div>
    </>
  );
};
