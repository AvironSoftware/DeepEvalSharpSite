# Faithfulness Metric

The Faithfulness Metric assesses the quality of your Retrieval-Augmented Generation (RAG) pipeline's generator by evaluating whether the `ActualOutput` factually aligns with the contents of your `RetrievalContext`. This metric focuses on identifying contradictions between the generated output and the provided context, ensuring that the information presented is accurate and trustworthy. Additionally, it offers explanations for its scores, making it a self-explaining LLM-Eval tool.

#### When you should use Faithfulness Metric

- **Ensuring Output Accuracy** – Use this metric to verify that the generated responses are factually consistent with the retrieved context, minimizing misinformation.
- **Evaluating RAG Pipeline Integrity** – Assess the reliability of your RAG pipeline by ensuring that the generator produces outputs faithful to the retrieved information.
- **Identifying Contradictions** – Detect and address any discrepancies between the generated content and the source material to maintain credibility.

#### When you SHOULDN'T use Faithfulness Metric

- **Assessing Language Quality** – If your goal is to evaluate the fluency, coherence, or stylistic aspects of the generated text, other metrics like Answer Relevancy or Summarization may be more appropriate.
- **Evaluating Retrieval Performance** – When focusing on the effectiveness of the retriever in fetching relevant documents, metrics like Contextual Precision or Contextual Recall would be more suitable.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be computationally intensive and may not be ideal for large-scale or real-time applications with limited resources.

## How to use

The Faithfulness Metric requires `ActualOutput` and `RetrievalContext` to function. You can instantiate an Faithfulness metric with optional parameters to customize its behavior.

Add Faithfulness Metric to your evaluator:

| Method                                                                                                                           | Description                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AddFaithfulness(int? truthsExtractionLimit = null, bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Faithfulness metric and adds it to the evaluator. You can optionally set the number of truths to extract from the actual output. Leaving this NULL will let the LLM decide |
| `AddFaithfulness(FaithfulnessMetricConfiguration config)`                                                                        | Creates the Faithfulness metric and adds it to the evaluator.                                                                                                                          |

Here's an example of how to use Faithfulness metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "I need help with my account; I mentioned earlier that my account number is 12345, but I cannot log in.",
        LLMOutput   = "Your account number is 12345. Try resetting your password using the 'Forgot Password' link.",
        GroundTruth = "Since you mentioned account number 12345 earlier and stated you're having trouble logging in, please try resetting your password using the 'Forgot Password' link. If the issue persists, let me escalate your ticket for further assistance.",
        RetrievalContext =
        [
            "Previous conversation where the user mentioned account number 12345 and issues with logging in."
        ]
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        ActualOutput    = c.LLMOutput,
        RetrievalContext = c.RetrievalContext
    }
);

// 3) Add metric and run
evaluator.AddFaithfulness(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter          | Description                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ActualOutput`     | A string That represents the actual output of the test case from the LLM.                                                                               |
| `RetrievalContext` | A list of background information strings that your app actually found when answering. Use this to compare what was retrieved against the ideal Context. |

### Optional Configuration Parameters

| Parameter               | Description                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `TruthsExtractionLimit` | An integer specifying the number of truths to extract from the actual output. Leaving this NULL will let the LLM decide. |
| `Threshold`             | A float representing the minimum passing score, defaulting to 0.5.                                                       |
| `IncludeReason`         | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                           |
| `StrictMode`            | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`.      |
