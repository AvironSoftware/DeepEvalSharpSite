# Contextual Precision Metric

The Contextual Precision Metric evaluates how well a Retrieval-Augmented Generation (RAG) pipeline's retriever ranks relevant context higher than irrelevant context for a given `input`. This metric helps ensure that an LLM receives the most useful information, improving the accuracy and quality of generated responses. The Contextual Precision Metric provides an explanation for its evaluation score, making it a self-explaining LLM-Eval tool.

#### When you should use Contextual Precision Metric

- **Evaluating Retriever Performance** – Use this metric to assess whether relevant documents or context appear at the top of retrieved results.
- **Optimizing Retrieval Strategies** – Identify and refine retrieval techniques to ensure LLMs receive high-quality supporting information.
- **Improving Re-Ranking Algorithms** – Measure how well re-ranking methods prioritize relevant data over irrelevant information.

#### When you SHOULDN'T use Contextual Precision Metric

- **Assessing LLM Response Quality** – This metric evaluates context ranking, not the coherence or accuracy of generated text.
- **Measuring Recall Instead of Precision** – If you need to ensure all relevant information is retrieved, consider using a recall-based metric instead.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be computationally intensive and may not be ideal for large-scale applications.

## How to use

The Contextual Precision Metric requires `InitialInput`, `ExpectedOutput`, and `RetrievalContext` to function. You can instantiate an Contextual Precision metric with optional parameters to customize its behavior.

Add Contextual Precision Metric to your evaluator:

| Method                                                                                               | Description                                                           |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `AddContextualPrecision(bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Contextual Precision metric and adds it to the evaluator. |
| `AddContextualPrecision(ContextualPrecisionMetricConfiguration config)`                              | Creates the Contextual Precision metric and adds it to the evaluator. |

Here's an example of how to use Contextual Precision metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "I need help with my account; I mentioned earlier that my account number is 12345, but I cannot log in.",
        LLMOutput   = "Please reset your password using the forgot password link.",
        GroundTruth   = "Since you mentioned account number 12345 earlier and stated you're having trouble logging in, please try resetting your password using the 'Forgot Password' link. If the issue persists, let me escalate your ticket for further assistance.",
        RetrievalContext = ["Previous conversation where the user mentioned account number 12345 and issues with logging in."]
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        InitialInput    = c.UserInput,
        ExpectedOutput    = c.GroundTruth,
        RetrievalContext = c.RetrievalContext
    }
);

// 3) Add metric and run
evaluator.AddContextualPrecision(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter          | Description                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `InitialInput`     | A string That represents the initial input is the user interaction with the LLM.                                                                        |
| `ExpectedOutput`   | The expected output of the test case.                                                                                                                   |
| `RetrievalContext` | A list of background information strings that your app actually found when answering. Use this to compare what was retrieved against the ideal Context. |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
