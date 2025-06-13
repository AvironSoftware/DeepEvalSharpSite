# Answer Relevancy Metric

The Answer Relevancy Metric evaluates how relevant an LLM-generated `actual_output` is in relation to the given `input`. This metric is particularly useful for assessing Retrieval-Augmented Generation (RAG) pipelines and ensuring that responses remain on-topic and directly address the input query. The Answer Relevancy Metric provides a reason for its evaluation score, making it a self-explaining LLM-Eval tool.

#### When you should use Answer Relevancy Metric

- **Assessing Response Relevance** – Use this metric to ensure an LLM-generated response directly addresses the input without introducing unrelated or off-topic content.
- **Optimizing RAG Pipelines** – Evaluate how well responses align with retrieved documents, helping refine retrieval strategies.
- **Benchmarking Model Performance** – Compare different LLMs or iterations of the same model to measure improvements in answer relevancy.

#### When you SHOULDN'T use Answer Relevancy Metric

- **Checking for Fluency or Coherence** – If you need to evaluate language quality, grammatical correctness, or fluency, a different metric is more suitable.
- **Evaluating Creative or Open-Ended Responses** – If responses are meant to be exploratory or subjective, strict relevancy checks may be too restrictive.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be costly and may not be ideal for high-frequency, large-scale applications.

## How to use

The Answer Relevancy Metric requires `input` and `actual_output` to function. You can instantiate an Answer Relevancy metric with optional parameters to customize its behavior.

Instantiate a Answer Relevancy Metric by using one of these static constructors:

| Constructor                | Description                |
| -------------------------- | -------------------------- |
| `AnswerRelevancy.Metric()` | Initializes a new instance |

Here's an example of how to use Answer Relevancy:

```csharp
var metric = AnswerRelevancy.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |

## Samples

We've given you a sample to work with that evaluates bla bla bla. Here's how you can run these samples:

```csharp
var metric = AnswerRelevancy.Metric();
var result = metric.Evaluate(modelOutput);
```
