# Task Completion Metric

The Task Completion Metric employs an LLM as a judge to measure how well an agent carries out the task specified in its `input`, taking into account both the `tools_called` and the agent’s `actual_output`. The Task Completion Metric is an agentic, referenceless LLM-as-a-judge metric that measures how well an LLM agent accomplishes a user-specified task.

#### When you should use Task Completion Metric

- **Assessing Agent Effectiveness** – Verify that your LLM agent successfully completes user-defined tasks by invoking necessary tools and providing correct outputs.
- **Benchmarking Agent Configurations** – Compare different agent strategies, tool sets, or LLM models on their task completion performance.
- **Debugging Agent Workflows** – Identify under- or over-utilization of tools within your agent pipeline to improve tool integration.

#### When you SHOULDN'T use Task Completion Metric

- **Non-Agentic Outputs** – This metric is not applicable if your LLM outputs static text without tool calls.
- **Factual Accuracy Checks** – For pure factual verification, consider Faithfulness or Hallucination metrics instead.
- **High-Throughput Requirements** – LLM-as-a-judge evaluations incur API calls and may not suit pipelines where speed and scale are primary concerns.

## How to use

The Task Completion Metric requires `input`, `actual_output`, and `tools_called`.

Instantiate a Task Completion Metric with:

| Constructor                     | Description                 |
| ------------------------------- | --------------------------- |
| `TaskCompletionMetric.Metric()` | Initializes a new instance. |

Here’s an example of how to use Task Completion Metric:

```csharp
var metric = TaskCompletionMetric.Metric();
var result = metric.Evaluate(modelOutput);
```

### Optional Parameters

| Parameter        | Description                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `threshold`      | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `include_reason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `strict_mode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
