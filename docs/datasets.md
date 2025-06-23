# Datasets

## Quick Summary

`EvaluatorTestData` is the core data structure in DeepEvalSharp to define individual evaluation items in .NET. All fields are optional—you only include what your metrics need.

An `EvaluatorTestData` has **seven** parameters:

- `InitialInput`
- `ExpectedOutput`
- `ActualOutput`
- `Context`
- `RetrievalContext`
- `ToolsCalled`
- `ExpectedTools`

## Parameters

### InitialInput

The text prompt or user input sent to the LLM.

- **Type:** `string?`
- **Usage:** Required by metrics that evaluate input formatting or conversational flow.

```csharp
var data = new EvaluatorTestData {
    InitialInput = "What is the capital of France?"
};
```

---

### ExpectedOutput

The ideal response you want the LLM to produce.

- **Type:** `string?`
- **Usage:** Used by output-comparison metrics (e.g., equality, similarity).

```csharp
var data = new EvaluatorTestData {
    ExpectedOutput = "Paris"
};
```

---

### ActualOutput

The actual text returned by the LLM during evaluation.

- **Type:** `string?`
- **Usage:** Compare against `ExpectedOutput` or inspect generation quality.

```csharp
var data = new EvaluatorTestData {
    ActualOutput = llm.Generate(prompt)
};
```

---

### Context

Curated, correct background facts you want the LLM to reference (gold standard).

- **Type:** `List<string>?`
- **Usage:** RAG and grounding metrics compare generated text against this reference.

```csharp
var data = new EvaluatorTestData {
    Context = new List<string> { "Paris is the capital of France." }
};
```

---

### RetrievalContext

The data your application actually fetched at runtime (e.g., from a search or vector database).

- **Type:** `List<string>?`
- **Usage:** Evaluate retriever performance by comparing `RetrievalContext` against `Context`.

```csharp
var data = new EvaluatorTestData {
    RetrievalContext = new List<string> { "Capital cities: Paris, Berlin, Madrid" }
};
```

---

### ToolsCalled

Tools the LLM invoked during execution.

- **Type:** `List<ToolCall>?`
- **Usage:** Agentic metrics verify which tools were used (e.g., API calls, calculators).

```csharp
var data = new EvaluatorTestData {
    ToolsCalled = new List<ToolCall> {
        new ToolCall { Name = "WebSearch" }
    }
};
```

---

### ExpectedTools

The tools you intended the LLM to call for optimal performance.

- **Type:** `List<ToolCall>?`
- **Usage:** Compare against `ToolsCalled` in tool-correctness metrics.

```csharp
var data = new EvaluatorTestData {
    ExpectedTools = new List<ToolCall> {
        new ToolCall { Name = "WebSearch" }
    }
};
```

---

## Context vs RetrievalContext

- **Context** is the textbook: the perfect facts you provide.
- **RetrievalContext** is the student’s notes: the real data fetched at runtime.

This distinction helps you pinpoint whether errors arise from retrieval or generation.

---

## Usage Example

```csharp
using DeepEvalSharp.Scoring;

// Define test data with only needed fields
var testData = new EvaluatorTestData
{
    InitialInput    = "What’s the tallest mountain?",
    ExpectedOutput  = "Mount Everest",
    Context          = new List<string> { "Mount Everest is 29,032 ft." },
    RetrievalContext = new List<string> { "Mount Everest 29032 ft" }
};

// Run evaluation
var config = new ContextualPrecisionMetricConfiguration
{
    IncludeReason = true
};
var contextualPrecMetric = new ContextualPrecisionMetric(ChatClient.GetInstance(), config);
var score = await contextualPrecMetric.ScoreAsync(context);
Console.WriteLine($"Score: {result.Score}, Passed: {result.Result}");
```
