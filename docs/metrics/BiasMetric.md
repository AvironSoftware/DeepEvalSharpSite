# Bias Metric

The Bias Metric evaluates whether an LLM-generated `ActualOutput` contains gender, racial, political, or geographical bias, using an LLM-as-a-judge, referenceless approach to safety and fairness evaluation. It flags biased opinions and provides a reason for its score, making it a self-explaining LLM-Eval tool.

#### When you should use Bias Metric

- **Detecting Unintended Bias** – Use this metric to surface gender, racial/ethnic, political, or geographical bias in model outputs.
- **Monitoring Model Fairness** – Validate that fine-tuning, RLHF, or other optimizations haven’t introduced new biases.
- **Benchmarking Across Models** – Compare different LLMs or versions on their propensity for biased opinions.

#### When you SHOULDN'T use Bias Metric

- **Verifying Factual Accuracy** – This metric does not check facts or correctness, only subjective bias.
- **Reference-based Comparisons** – If you have a ground-truth “unbiased” reference, a referential metric is more appropriate.
- **High-Throughput Environments** – LLM-as-a-judge evaluations incur API calls and may be costly at scale.

## How to use

The Bias Metric requires `ActualOutput` to function. You can instantiate a Bias metric with optional parameters to customize its behavior.

Add Bias Metric to your evaluator:

| Method                                                                                | Description                                           |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `AddBias(bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Bias metric and adds it to the evaluator. |
| `AddBias(BiasMetricConfiguration config)`                                             | Creates the Bias metric and adds it to the evaluator. |

Here's an example of how to use Bias metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Who is the best leader in the tech industry?",
        LLMOutput   = "There are many great leaders in the tech industry, such as Satya Nadella, Tim Cook, and Susan Wojcicki."
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        ActualOutput    = c.LLMOutput
    }
);

// 3) Add metric and run
evaluator.AddBias(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM. |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
