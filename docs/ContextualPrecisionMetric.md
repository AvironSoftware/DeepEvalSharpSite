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

The Contextual Precision Metric requires `input`, `actual_output`, `expected_output`, and `retrieval_context`. You can instantiate the metric with optional parameters to customize its behavior.

Instantiate a Contextual Precision Metric by using one of these static constructors:

| Constructor                    | Description                |
| ------------------------------ | -------------------------- |
| `ContextualPrecision.Metric()` | Initializes a new instance |

Here's an example of how to use Contextual Precision:

```csharp
var metric = ContextualPrecision.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing threshold, defaulting to 0.5.                                              |
| `include_reason` | A boolean that, when set to `True`, provides a reason for its evaluation score. Default is `True`.                  |
| `strict_mode`    | Enforces a binary metric score—1 for perfect precision, 0 otherwise—setting the threshold to 1. Default is `False`. |

## Samples

We've given you a sample to work with that evaluates bla bla bla. Here's how you can run these samples:

```csharp
var metric = ContextualPrecision.Metric();
var result = metric.Evaluate(modelOutput);
```
