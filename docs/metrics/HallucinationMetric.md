# Hallucination Metric

The Hallucination Metric evaluates whether an LLM-generated `ActualOutput` contains fabricated or unsupported information by comparing it against the provided `Context`, using an LLM-as-a-judge, reference-based approach. It flags hallucinated content and provides a reason for its score, making it a self-explaining LLM-Eval tool.

#### When you should use Hallucination Metric

- **Detecting Fabrications** – Surface instances where the model asserts facts not supported by the provided context.
- **Validating Factual Outputs** – Check that LLM outputs align precisely with known source documents or context segments.
- **Benchmarking Model Precision** – Compare different LLMs or fine-tuned versions on their propensity to hallucinate.

#### When you SHOULDN'T use Hallucination Metric

- **Assessing Relevance or Completeness** – If you need to measure coverage or relevance rather than factual correctness, use Answer Relevancy or Contextual Relevancy.
- **Evaluating Creative or Fictional Outputs** – For poetry, stories, or other creative tasks where “hallucination” is expected, this metric is too strict.
- **Contexts Unavailable or Broad-Sweep Checks** – This metric requires explicit context segments; it’s unsuitable when you lack a defined source of truth.

## How to use

The Hallucination Metric requires `ActualOutput` and `Context` to function. You can instantiate an Hallucination metric with optional parameters to customize its behavior.

Add Hallucination Metric to your evaluator:

| Method                                                                                         | Description                                                    |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `AddHallucination(bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Hallucination metric and adds it to the evaluator. |
| `AddHallucination(HallucinationMetricConfiguration config)`                                    | Creates the Hallucination metric and adds it to the evaluator. |

Here's an example of how to use Hallucination:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Who was the first president of the United States?",
        LLMOutput   = "The first president of the United States was George Washington.",
        Context = ["Verified historical records state George Washington was the first U.S. president."]
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        ActualOutput    = c.LLMOutput,
        Context         = c.Context
    }
);

// 3) Add metric and run
evaluator.AddHallucination(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.                                                                                                 |
| `Context`      | A list of strings that represent the ideal background information strings that best answer the question. Think of this as the “correct” facts you want the system to use. |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
