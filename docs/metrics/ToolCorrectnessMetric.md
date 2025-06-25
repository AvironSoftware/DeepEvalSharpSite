# Tool Correctness Metric

The Tool Correctness Metric measures how accurately an LLM agent invokes its tools by comparing the actual calls made (`ToolsCalled`) against the list of expected tools (`ExpectedTools`). It supports configurable strictness—by default it checks just the tool names, but you can require matching input parameters and outputs for full verification—and returns both a numeric score and a human-readable explanation of any mismatches, making it a self-explaining LLM-Eval tool.

#### When you should use Tool Correctness Metric

- **Validating Agent Workflows** – Confirm that your agent invokes exactly the tools you intended, catching missed or extra calls.
- **Benchmarking Tool Integration** – Compare different agent designs or LLM models on their ability to call tools correctly.
- **Debugging Tool Calls** – Diagnose whether errors stem from incorrect tool usage (wrong parameters, ordering, etc.).

#### When you SHOULDN'T use Tool Correctness Metric

- **Non-Agentic Text Outputs** – This metric isn’t applicable when your LLM generates standalone text without any tool interactions.
- **Factual or Relevance Checks** – For assessing content accuracy or topical relevance, use Faithfulness, Hallucination or Answer Relevancy metrics instead.
- **High-Throughput Constraints** – Although it’s purely matching logic, large batches of complex test cases may still incur performance considerations.

## How to use

The Tool Correctness Metric requires `ToolsCalled` and `ExpectedTools` to function. You can instantiate an Tool Correctness metric with optional parameters to customize its behavior.

Add Tool Correctness Metric to your evaluator:

| Method                                                                                                                               | Description                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `AddToolCorrectness(bool shouldConsiderOrdering = false, double threshold = 0.5, List<ToolCallParamsEnum>? evaluationParams = null)` | Creates the Tool Correctness metric and adds it to the evaluator.                                        |
| `AddToolCorrectnessExactMatch(double threshold = 0.5, List<ToolCallParamsEnum>? evaluationParams = null)`                            | Creates the Tool Correctness metric and adds it to the evaluator. Use if only exact matches are desired. |
| `AddToolCorrectness(ToolCorrectnessMetricConfiguration config)`                                                                      | Creates the Tool Correctness metric and adds it to the evaluator.                                        |

Here's an example of how to use Tool Correctness metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Look up product 101 and add it to my cart.",
        LLMOutput   = """{"tool": "product_lookup"} -> {"tool": "add_to_cart"}""",
        ToolsCalled =
        [
            new ToolCall { Name = "product_lookup", InputParameters = new Dictionary<string, object?> { { "product_id", 101 } } },
            new ToolCall
            {
                Name = "add_to_cart",
                InputParameters = new Dictionary<string, object?> { { "product_id", 101 }, { "quantity", 1 } }
            }
        ],
        ExpectedTools =
        [
            new ToolCall { Name = "product_lookup", InputParameters = new Dictionary<string, object?> { { "product_id", 101 } } },
            new ToolCall {
                Name = "add_to_cart",
                InputParameters = new Dictionary<string, object?> { { "product_id", 101 }, { "quantity", 1 } }
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
        ToolsCalled     = c.ToolsCalled,
        ExpectedTools   = c.ExpectedTools
    }
);

// 3) Add metric and run
evaluator.AddToolCorrectness(shouldConsiderOrdering: true, evaluationParams: [ToolCallParamsEnum.INPUT_PARAMETERS, ToolCallParamsEnum.TOOL]);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter       | Description                                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `ToolsCalled`   | A list of `EvalSharp.Models.ToolCall`'s which are tools your LLM actually invoked during execution.                            |
| `ExpectedTools` | A list of `EvalSharp.Models.ToolCall`'s which are tools your LLM expected tools your LLM should have invoked during execution. |

### Optional Configuration Parameters

| Parameter                | Description                                                                                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ShouldConsiderOrdering` | A boolean that indicates if order should be considered apart of the metric score. Default is `False`.                                                                         |
| `EvaluationParams`       | List of tool call parameters to include in scoring; defaults to `ToolCallParamsEnum.TOOL`.                                                                                    |
| `ShouldExactMatch`       | A boolean that indicates if matching should be exact. If this is provided, `ShouldConsiderOrdering` is ignored, but `EvaluationParams` is still utilized. Default is `False`. |
| `Threshold`              | A float representing the minimum passing score, defaulting to 0.5.                                                                                                            |
| `IncludeReason`          | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                                                                                |
| `StrictMode`             | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`.                                                           |
