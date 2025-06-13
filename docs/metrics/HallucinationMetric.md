# Hallucination Metric

The Hallucination Metric evaluates whether an LLM-generated `actual_output` contains fabricated or unsupported information by comparing it against the provided `context`, using an LLM-as-a-judge, reference-based approach. It flags hallucinated content and provides a reason for its score, making it a self-explaining LLM-Eval tool.

#### When you should use Hallucination Metric

- **Detecting Fabrications** – Surface instances where the model asserts facts not supported by the provided context.
- **Validating Factual Outputs** – Check that LLM outputs align precisely with known source documents or context segments.
- **Benchmarking Model Precision** – Compare different LLMs or fine-tuned versions on their propensity to hallucinate.

#### When you SHOULDN'T use Hallucination Metric

- **Assessing Relevance or Completeness** – If you need to measure coverage or relevance rather than factual correctness, use Answer Relevancy or Contextual Relevancy.
- **Evaluating Creative or Fictional Outputs** – For poetry, stories, or other creative tasks where “hallucination” is expected, this metric is too strict.
- **Contexts Unavailable or Broad-Sweep Checks** – This metric requires explicit context segments; it’s unsuitable when you lack a defined source of truth.

## How to use

The Hallucination Metric requires three arguments to create an `LLMTestCase`:

- `input`: the user prompt or query
- `actual_output`: the LLM’s response
- `context`: a list of reference strings representing the source of truth

Instantiate a Hallucination Metric by using the static constructor:

| Constructor                    | Description                              |
| ------------------------------ | ---------------------------------------- |
| `HallucinationMetric.Metric()` | Initializes a new instance of the metric |

Here’s an example of how to use Hallucination Metric in C#:

```csharp
var metric = HallucinationMetric.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
