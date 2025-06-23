# Task Completion Metric

The Task Completion Metric employs an LLM as a judge to measure how well an agent carries out the task specified in its `InitialInput`, taking into account both the `ToolsCalled` and the agent’s `ActualOutput`. The Task Completion Metric is an agentic, referenceless LLM-as-a-judge metric that measures how well an LLM agent accomplishes a user-specified task.

#### When you should use Task Completion Metric

- **Assessing Agent Effectiveness** – Verify that your LLM agent successfully completes user-defined tasks by invoking necessary tools and providing correct outputs.
- **Benchmarking Agent Configurations** – Compare different agent strategies, tool sets, or LLM models on their task completion performance.
- **Debugging Agent Workflows** – Identify under- or over-utilization of tools within your agent pipeline to improve tool integration.

#### When you SHOULDN'T use Task Completion Metric

- **Non-Agentic Outputs** – This metric is not applicable if your LLM outputs static text without tool calls.
- **Factual Accuracy Checks** – For pure factual verification, consider Faithfulness or Hallucination metrics instead.
- **High-Throughput Requirements** – LLM-as-a-judge evaluations incur API calls and may not suit pipelines where speed and scale are primary concerns.

## How to use

The Task Completion Metric requires `InitialInput`, `ActualOutput`, and `ToolsCalled` to function. You can instantiate an Task Completion metric with optional parameters to customize its behavior.

Add Task Completion Metric to your evaluator:

| Method                                                                                          | Description                                                      |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `AddTaskCompletion(bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Task Completion metric and adds it to the evaluator. |
| `AddTaskCompletion(TaskCompletionMetricConfiguration config)`                                   | Creates the Task Completion metric and adds it to the evaluator. |

Here's an example of how to use Task Completion metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "I need to reset my password.",
        LLMOutput   = "I’ve sent a password reset link to your registered email.",
        ToolsCalled = [
            new ToolCall
            {
                Name = "Reset Password",
                Description = "Resets a user's password and sends a reset link.",
                InputParameters = new Dictionary<string, object?> { { "user_request", "reset password" } },
                Output = "Password reset link sent."
            }
        ]
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        InitialInput    = c.UserInput,
        ActualOutput    = c.LLMOutput,
        ToolsCalled     = c.ToolsCalled
    }
);

// 3) Add metric and run
evaluator.AddTaskCompletion(includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| `InitialInput` | A string That represents the initial input is the user interaction with the LLM.                        |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.                               |
| `ToolsCalled`  | A list of `DeepEvalSharp.Models.ToolCall`'s which are tools your LLM actually invoked during execution. |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
