"use client";
import { useState } from "react";

// @ts-ignore
import Reader from "edifact/reader.js";
import { JsonView, allExpanded } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

const reader = new Reader({ encoding: "UNOC" });

export default function Home() {
  const [input, setInput] = useState<string>();
  const [result, setResult] = useState(null);

  return (
    <main style={{ margin: "1rem" }}>
      <div style={{ display: "flex", gap: "3rem", margin: "1rem 0" }}>
        <h1>DTA EDIFACT Parser</h1>
        <button
          style={{ padding: "0 1rem" }}
          onClick={() => {
            try {
              const result = reader.parse(input);

              setResult(result);
            } catch (error: any) {
              window.alert(error);
              setResult(null);
            }
          }}
        >
          Parse
        </button>
      </div>
      <textarea
        style={{ width: "60%", maxWidth: "100%", marginBottom: "2rem" }}
        rows={30}
        value={input}
        onChange={(e) => {
          setResult(null);
          setInput(e.target.value as any);
        }}
      />

      {result ? (
        <JsonView data={result} shouldExpandNode={allExpanded} />
      ) : null}
    </main>
  );
}
