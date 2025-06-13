# Summarization Metric

The Summarization Metric leverages an LLM as a judge to assess if your model’s `actual_output` is both factually accurate and sufficiently comprehensive when compared to the original `input`. It generates two sub-scores—a contradiction-and-fabrication–detecting alignment score and a key-information–measuring coverage score—takes the lower of the two as the final result, and supplies a human-readable explanation for its judgment, making it a self-explaining LLM-Eval tool.

#### When you should use Summarization Metric

- **Assessing Summary Fidelity** – Ensure summaries accurately reflect source text without fabrications or contradictions.
- **Evaluating Information Coverage** – Verify that the summary includes all necessary details from the original content.
- **Benchmarking Summarization Quality** – Compare different models or configurations on their ability to generate faithful, comprehensive summaries.

#### When you SHOULDN'T use Summarization Metric

- **Fact-Checking with Explicit References** – For context-backed validation, metrics like Hallucination or Faithfulness are more appropriate.
- **Creative or Abstracted Summaries** – If you require imaginative rewrites rather than faithful representation.
- **High-Throughput/Cacheable Requirements** – As a non-cacheable metric requiring multiple LLM calls, it may not suit large-scale pipelines.

## How to use

The Summarization Metric requires`input` and `actual_output`. Instantiate and run it as follows:

| Constructor                    | Description                               |
| ------------------------------ | ----------------------------------------- |
| `SummarizationMetric.Metric()` | Initializes a new instance of the metric. |

Here’s an example of how to use Summarization Metric:

```csharp
var metric = SummarizationMetric.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
