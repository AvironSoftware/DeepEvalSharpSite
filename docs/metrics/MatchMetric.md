# Match Metric

The Match Metric evaluates whether an LLM-generated `ActualOutput` correctly matches the `ExpectedOutput` according to configurable matching rules. This metric provides flexible options for exact matching, regex-based matching, or matching output that follows the occurrence of a specific string.

#### When you should use Match Metric

- **Validating Exact Output** – Ensure the LLM's output exactly matches the expected string, useful for precise tasks like tool calls or structured responses.
- **Regex Pattern Matching** – When output may vary in format but should conform to a defined regex pattern.
- **Matching Output After a Specific String** – For scenarios where only content following a particular phrase is evaluated.

#### When you SHOULDN'T use Match Metric

- **Subjective or Open-Ended Responses** – If outputs are exploratory or open to interpretation, strict matching may be inappropriate.
- **Evaluating Fluency or Relevance** – For language quality or contextual relevance, other metrics like Answer Relevancy or Contextual Precision are more suitable.
- **Overly Complex Output Logic** – If determining correctness requires more than string matching or simple pattern checks, consider a custom metric.

## How to use

The Match Metric compares the `ExpectedOutput` and `ActualOutput` using your preferred matching mode. You can configure it for exact matches, regex patterns, or output after a specific string occurrence.

Add Match Metric to your evaluator:

| Method                                                                                             | Description                                                        |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `AddExactMatchMetric()`                                                                            | Creates a Match Metric configured for strict exact matching.       |
| `AddRegexMatchMetric(string matchRegexString, StringComparison? stringComparisonForAnswer = null)` | Creates a Match Metric configured for regex-based matching.        |
| `AddAfterStringMatchMetric(string searchString)`                                                   | Creates a Match Metric for evaluating output after a given string. |

Here's an example of how to use the Match Metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        ExpectedOutput = "Paris",
        LLMOutput      = "Well, hello there!"
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    null!,
    cases,
    c => new EvaluatorTestData
    {
        ExpectedOutput = c.ExpectedOutput,
        ActualOutput   = c.LLMOutput
    }
);

// 3) Add metric and run
evaluator.AddRegexMatchMetric(@"\bhello\b", StringComparison.InvariantCultureIgnoreCase);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter        | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `ExpectedOutput` | The string representing the ideal or correct output for the test case.   |
| `ActualOutput`   | The string representing the actual LLM-generated output being evaluated. |
