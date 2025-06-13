# GEval Metric

G-Eval is a framework within NEval that leverages large language models (LLMs) with chain-of-thought (CoT) prompting to assess LLM outputs based on customizable criteria. This versatile metric allows for human-like evaluations across various use cases by defining specific evaluation criteria or steps. Users can create custom metrics by specifying parameters such as 'input' and 'actual_output', and optionally 'expected_output' and 'context', tailoring the evaluation to their specific needs. G-Eval also offers flexibility in configuration, including options for setting evaluation steps, thresholds, and selecting different LLM models.

G-Eval came from this paper - and its usage is well described here in the DeepEval docs: https://docs.confident-ai.com/docs/metrics-llm-evals#what-is-g-eval

#### When you should use GEval

- **Automated Human-Like Evaluations** – Use G-Eval to assess LLM responses for coherence, accuracy, and relevance without manual review.
- **Custom Metrics for Specific Needs** – Define tailored evaluation criteria for domain-specific applications like legal, medical, or creative writing.
- **Scalable and Flexible Testing** – Configure evaluation steps, thresholds, and model choices for large-scale benchmarking and comparisons.

#### When you SHOULDN'T use GEval

- **Low-Stakes or Simple Evaluations** – If basic accuracy checks or keyword matching suffice, G-Eval's complexity may be unnecessary.
- **Evaluating Novel or Unpredictable Outputs** – When assessing highly creative or unconventional responses, rigid evaluation criteria may limit fair assessment.
- **Resource-Constrained Environments** – Running LLM-based evaluations can be costly and slow, making G-Eval inefficient for rapid, large-scale testing with limited resources.

## How to use

GEval requires either criteria or evaluation steps.

- Criteria is useful when doing quick evaluations of LLM-generated outputs for relevance and factual accuracy, ensuring they meet broad quality standards without requiring step-by-step reasoning.
- Evaluation steps is useful when you need to systematically verify complex outputs, such as fact-checking a legal argument by breaking down claims and cross-referencing reliable sources.

Instantiate a GEval metric by using one of these static constructors:

| Constructor                                              | Description                                                                                                                                               |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GEval.ForCriteria(string criteria)`                     | Create a GEval metric for a specific criteria. NOTE: this makes an additional call to the LLM to generate evaluation steps based on the initial criteria. |
| `GEval.ForEvaluationSteps(List<string> evaluationSteps)` | Create a GEval metric with a list of evaluation steps.                                                                                                    |

Here's an example of how to use GEval:

```csharp
var metric = GEval.ForCriteria("bla bla bla");
var result = metric.Evaluate(modelOutput);
```

[[The optional parameters are: (these are obv incorrect, just an example)]]

| Parameter    | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `threshold`  | A float representing the minimum passing score, defaulting to 0.5.                                                                               |
| `StrictMode` | A boolean that, when set to True, enforces a binary metric score—1 for perfection, 0 otherwise—and sets the threshold to 1. The default is False |

## Samples

We've given you a sample to work with that evaluates bla bla bla. Here's how you can run these samples:

```csharp
var metric = GEval.ForCriteria("bla bla bla");
var result = metric.Evaluate(modelOutput);
```
