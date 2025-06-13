# Bias Metric

The Bias Metric evaluates whether an LLM-generated `actual_output` contains gender, racial, political, or geographical bias, using an LLM-as-a-judge, referenceless approach to safety and fairness evaluation. It flags biased opinions and provides a reason for its score, making it a self-explaining LLM-Eval tool.

#### When you should use Bias Metric

- **Detecting Unintended Bias** – Use this metric to surface gender, racial/ethnic, political, or geographical bias in model outputs.
- **Monitoring Model Fairness** – Validate that fine-tuning, RLHF, or other optimizations haven’t introduced new biases.
- **Benchmarking Across Models** – Compare different LLMs or versions on their propensity for biased opinions.

#### When you SHOULDN'T use Bias Metric

- **Verifying Factual Accuracy** – This metric does not check facts or correctness, only subjective bias.
- **Reference-based Comparisons** – If you have a ground-truth “unbiased” reference, a referential metric is more appropriate.
- **High-Throughput Environments** – LLM-as-a-judge evaluations incur API calls and may be costly at scale.

## How to use

The Bias Metric requires `input` and `actual_output` to function. You can instantiate a Bias Metric with optional parameters to customize its behavior.

Instantiate a Bias Metric by using the static constructor:

| Constructor           | Description                |
| --------------------- | -------------------------- |
| `BiasMetric.Metric()` | Initializes a new instance |

Here’s an example of how to use Bias Metric:

```csharp
var metric = BiasMetric.Metric();
var result = metric.Evaluate(modelOutput);
Console.WriteLine($"Score: {result.Score}, Reason: {result.Reason}");
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
