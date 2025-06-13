# Tool Correctness Metric

The Tool Correctness Metric measures how accurately an LLM agent invokes its tools by comparing the actual calls made (`tools_called`) against the list of expected tools (`expected_tools`). It supports configurable strictness—by default it checks just the tool names, but you can require matching input parameters and outputs for full verification—and returns both a numeric score and a human-readable explanation of any mismatches, making it a self-explaining LLM-Eval tool.

#### When you should use Tool Correctness Metric

- **Validating Agent Workflows** – Confirm that your agent invokes exactly the tools you intended, catching missed or extra calls.
- **Benchmarking Tool Integration** – Compare different agent designs or LLM models on their ability to call tools correctly.
- **Debugging Tool Calls** – Diagnose whether errors stem from incorrect tool usage (wrong parameters, ordering, etc.).

#### When you SHOULDN'T use Tool Correctness Metric

- **Non-Agentic Text Outputs** – This metric isn’t applicable when your LLM generates standalone text without any tool interactions.
- **Factual or Relevance Checks** – For assessing content accuracy or topical relevance, use Faithfulness, Hallucination or Answer Relevancy metrics instead.
- **High-Throughput Constraints** – Although it’s purely matching logic, large batches of complex test cases may still incur performance considerations.

## How to use

The Tool Correctness Metric requires four fields:

- `input`
- `actual_output`
- `tools_called` – list of `ToolCall` objects actually invoked
- `expected_tools` – list of `ToolCall` objects you expect the agent to invoke

Instantiate the metric with:

| Constructor                      | Description                             |
| -------------------------------- | --------------------------------------- |
| `ToolCorrectnessMetric.Metric()` | Creates a new Tool Correctness instance |

Here’s an example of how to use Tool Correctness Metric:

```csharp
var metric = ToolCorrectnessMetric.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
