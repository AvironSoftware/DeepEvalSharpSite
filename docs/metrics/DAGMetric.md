# DAG (Deep Acyclic Graph) Metric

The Deep Acyclic Graph (DAG) Metric in `NEval` allows you to construct deterministic decision trees for evaluating LLM outputs using an LLM-as-a-judge approach. This metric provides fine-grained control over the evaluation process by defining specific decision nodes and criteria, enabling precise assessments tailored to your application's requirements.

#### When you should use DAG Metric

- **Custom Evaluation Criteria** – Use the DAG Metric when you need to define specific, deterministic evaluation criteria that go beyond standard metrics, allowing for tailored assessments of LLM outputs.
- **Complex Decision Trees** – Implement the DAG Metric to evaluate outputs that require multi-step decision processes, ensuring each aspect of the output meets your defined standards.
- **Enhanced Control Over Evaluation** – Opt for the DAG Metric when you require more control over the evaluation process compared to other metrics like G-Eval, allowing for precise customization of evaluation steps.

#### When you SHOULDN'T use DAG Metric

- **Simple Evaluation Needs** – If your evaluation criteria are straightforward and don't require complex decision trees, using the DAG Metric may introduce unnecessary complexity.
- **Resource Constraints** – Constructing and processing detailed decision trees can be resource-intensive; if computational resources are limited, consider simpler metrics.
- **Lack of Specific Criteria** – If you don't have well-defined evaluation criteria or decision processes, the flexibility of the DAG Metric may not be fully utilized, making other metrics more appropriate.

## How to use

The DAG Metric requires `input` and `actual_output` when creating an test cases. Additional arguments like `expected_output` and `tools_called` may be necessary depending on your evaluation criteria.

Instantiate a DAG Metric by using one of these static constructors:

| Constructor    | Description                |
| -------------- | -------------------------- |
| `DAG.Metric()` | Initializes a new instance |

Here's an example of how to use DAG:

```csharp
var metric = DAG.Metric();
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
var metric = DAG.Metric();
var result = metric.Evaluate(modelOutput);
```
