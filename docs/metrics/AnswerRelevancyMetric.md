# Answer Relevancy Metric

The Answer Relevancy Metric evaluates how relevant an LLM-generated `ActualOutput` is in relation to the given `InitialInput`. This metric is particularly useful for assessing Retrieval-Augmented Generation (RAG) pipelines and ensuring that responses remain on-topic and directly address the input query. The Answer Relevancy Metric provides a reason for its evaluation score, making it a self-explaining LLM-Eval tool.

#### When you should use Answer Relevancy Metric

- **Assessing Response Relevance** – Use this metric to ensure an LLM-generated response directly addresses the input without introducing unrelated or off-topic content.
- **Optimizing RAG Pipelines** – Evaluate how well responses align with retrieved documents, helping refine retrieval strategies.
- **Benchmarking Model Performance** – Compare different LLMs or iterations of the same model to measure improvements in answer relevancy.

#### When you SHOULDN'T use Answer Relevancy Metric

- **Checking for Fluency or Coherence** – If you need to evaluate language quality, grammatical correctness, or fluency, a different metric is more suitable.
- **Evaluating Creative or Open-Ended Responses** – If responses are meant to be exploratory or subjective, strict relevancy checks may be too restrictive.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be costly and may not be ideal for high-frequency, large-scale applications.

## How to use

The Answer Relevancy Metric requires `InitialInput` and `ActualOutput` to function. You can instantiate an Answer Relevancy metric with optional parameters to customize its behavior.

Add Answer Relevancy Metric to your evaluator:

| Method                                                                                           | Description                                                       |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `AddAnswerRelevancy(bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Answer Relevancy metric and adds it to the evaluator. |
| `AddAnswerRelevancy(AnswerRelevancyMetricConfiguration config)`                                  | Creates the Answer Relevancy metric and adds it to the evaluator. |

Here's an example of how to use Answer Relevancy metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Please summarize the article on climate change impacts.",
        LLMOutput   = "The article talks about how technology is advancing rapidly.",
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        InitialInput    = c.UserInput,
        ActualOutput    = c.LLMOutput
    }
);

// 3) Add metric and run
evaluator.AddAnswerRelevancy(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `InitialInput` | A string That represents the initial input is the user interaction with the LLM. |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.        |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
