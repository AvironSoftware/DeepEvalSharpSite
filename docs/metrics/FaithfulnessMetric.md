# Faithfulness Metric

The Faithfulness Metric assesses the quality of your Retrieval-Augmented Generation (RAG) pipeline's generator by evaluating whether the `actual_output` factually aligns with the contents of your `retrieval_context`. This metric focuses on identifying contradictions between the generated output and the provided context, ensuring that the information presented is accurate and trustworthy. Additionally, it offers explanations for its scores, making it a self-explaining LLM-Eval tool.

#### When you should use Faithfulness Metric

- **Ensuring Output Accuracy** – Use this metric to verify that the generated responses are factually consistent with the retrieved context, minimizing misinformation.
- **Evaluating RAG Pipeline Integrity** – Assess the reliability of your RAG pipeline by ensuring that the generator produces outputs faithful to the retrieved information.
- **Identifying Contradictions** – Detect and address any discrepancies between the generated content and the source material to maintain credibility.

#### When you SHOULDN'T use Faithfulness Metric

- **Assessing Language Quality** – If your goal is to evaluate the fluency, coherence, or stylistic aspects of the generated text, other metrics like Answer Relevancy or Summarization may be more appropriate.
- **Evaluating Retrieval Performance** – When focusing on the effectiveness of the retriever in fetching relevant documents, metrics like Contextual Precision or Contextual Recall would be more suitable.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be computationally intensive and may not be ideal for large-scale or real-time applications with limited resources.

## How to use

The Faithfulness Metric requires `input`, `actual_output`, and `retrieval_context` to function effectively. You can instantiate a Faithfulness Metric with optional parameters to customize its behavior.

Instantiate a Faithfulness Metric by using one of these static constructors:

| Constructor             | Description                |
| ----------------------- | -------------------------- |
| `Faithfulness.Metric()` | Initializes a new instance |

Here's an example of how to use Faithfulness:

```csharp
var metric = Faithfulness.Metric();
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
var metric = Faithfulness.Metric();
var result = metric.Evaluate(modelOutput);
```
