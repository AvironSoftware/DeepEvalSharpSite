# Contextual Recall Metric

The Contextual Recall Metric evaluates the effectiveness of your Retrieval-Augmented Generation (RAG) pipeline's retriever by assessing how well the retrieved context (`RetrievalContext`) aligns with the expected output (`ExpectedOutput`). This metric ensures that the retriever captures and provides all relevant information necessary for generating accurate responses. Additionally, it offers explanations for its scores, making it a self-explaining LLM-Eval tool.

#### When you should use Contextual Recall Metric

- **Evaluating Retriever Coverage** – Use this metric to assess whether your retriever captures all necessary information from the knowledge base to generate the expected output.
- **Optimizing Embedding Models** – Determine if your embedding model accurately represents and retrieves relevant information based on the input context.
- **Improving Retrieval Strategies** – Identify gaps in the retrieval process to ensure comprehensive information is provided to the generator.

#### When you SHOULDN'T use Contextual Recall Metric

- **Assessing Response Quality** – If your goal is to evaluate the quality, fluency, or coherence of the generated responses, other metrics like Answer Relevancy or Faithfulness may be more appropriate.
- **Evaluating Ranking Performance** – When focusing on the order of retrieved information, the Contextual Precision Metric would be more suitable.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be computationally intensive and may not be ideal for large-scale or real-time applications with limited resources.

## How to use

The Contextual Recall Metric requires `ExpectedOutput` and `RetrievalContext` to function. You can instantiate an Contextual Recall metric with optional parameters to customize its behavior.

Add Contextual Recall Metric to your evaluator:

| Method                                                                 | Description                                                        |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `AddContextualRecall(bool strictMode = false, double threshold = 0.5)` | Creates the Contextual Recall metric and adds it to the evaluator. |
| `AddContextualRecall(ContextualRecallMetricConfiguration config)`      | Creates the Contextual Recall metric and adds it to the evaluator. |

Here's an example of how to use Contextual Recall metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Can you explain why plants need sunlight, referring to our discussion on photosynthesis last week?",
        LLMOutput   = "Plants need sunlight because it helps them grow more flowers.",
        GroundTruth   = "As discussed in our previous lesson on photosynthesis, plants require sunlight to convert carbon dioxide and water into glucose and oxygen, which is vital for their growth and energy production.",
        RetrievalContext =
        [
            "Previous lesson included a detailed explanation of photosynthesis and the role of sunlight in the process.",
            "Irrelevant context: Some sources incorrectly claim that sunlight only influences the blooming of flowers."
        ]
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        ExpectedOutput = c.GroundTruth,
        RetrievalContext = c.RetrievalContext
    }
);

// 3) Add metric and run
evaluator.AddContextualRecall(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter          | Description                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExpectedOutput`   | The expected output of the test case.                                                                                                                   |
| `RetrievalContext` | A list of background information strings that your app actually found when answering. Use this to compare what was retrieved against the ideal Context. |

### Optional Configuration Parameters

| Parameter    | Description                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`  | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `StrictMode` | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
