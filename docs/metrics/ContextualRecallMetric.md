# Contextual Recall Metric

The Contextual Recall Metric evaluates the effectiveness of your Retrieval-Augmented Generation (RAG) pipeline's retriever by assessing how well the retrieved context (`retrieval_context`) aligns with the expected output (`expected_output`). This metric ensures that the retriever captures and provides all relevant information necessary for generating accurate responses. Additionally, it offers explanations for its scores, making it a self-explaining LLM-Eval tool.

#### When you should use Contextual Recall Metric

- **Evaluating Retriever Coverage** – Use this metric to assess whether your retriever captures all necessary information from the knowledge base to generate the expected output.
- **Optimizing Embedding Models** – Determine if your embedding model accurately represents and retrieves relevant information based on the input context.
- **Improving Retrieval Strategies** – Identify gaps in the retrieval process to ensure comprehensive information is provided to the generator.

#### When you SHOULDN'T use Contextual Recall Metric

- **Assessing Response Quality** – If your goal is to evaluate the quality, fluency, or coherence of the generated responses, other metrics like Answer Relevancy or Faithfulness may be more appropriate.
- **Evaluating Ranking Performance** – When focusing on the order of retrieved information, the Contextual Precision Metric would be more suitable.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be computationally intensive and may not be ideal for large-scale or real-time applications with limited resources.

## How to use

The Contextual Recall Metric requires `input`, `actual_output`, `expected_output`, and `retrieval_context` to function effectively. You can instantiate a Contextual Recall Metric with optional parameters to customize its behavior.

Instantiate a Contextual Recall Metric by using one of these static constructors:

| Constructor                 | Description                |
| --------------------------- | -------------------------- |
| `ContextualRecall.Metric()` | Initializes a new instance |

Here's an example of how to use Contextual Recall:

```csharp
var metric = ContextualRecall.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter     | Description                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `threshold`   | A float representing the minimum passing threshold, defaulting to 0.5.                                            |
| `strict_mode` | Enforces a binary metric score—1 for perfect recall, 0 otherwise—and sets the threshold to 1. Default is `False`. |

## Samples

We've given you a sample to work with that evaluates bla bla bla. Here's how you can run these samples:

```csharp
var metric = ContextualRecall.Metric();
var result = metric.Evaluate(modelOutput);
```
