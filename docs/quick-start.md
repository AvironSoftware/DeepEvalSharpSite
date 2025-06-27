# Quick Start

Follow these steps to get up and running with EvalSharp in minutes.

## Prerequisites

- .NET SDK 8.0 or later
- A code editor or IDE (e.g., Visual Studio, Visual Studio Code)
- (Optional) An API key (e.g., `OPENAI_API_KEY`) for LLM‑evaluated metrics

---

## 1. Create a .NET Project

```bash
mkdir EvalSample
cd EvalSample
dotnet new console
```

---

## 2. Install EvalSharp

```bash
dotnet add package EvalSharp
```

---

## 3. Prepare Your Data

```csharp
using System.Text.Json.Serialization;

public class SummaryInputOutput
{
    [JsonPropertyName("input")]
    public required string Input { get; set; }
    [JsonPropertyName("actual_output")]
    public required string ActualOutput { get; set; }
    [JsonPropertyName("expected_output")]
    public required string ExpectedOutput { get; set; }

    public static string TestDataSet = "Your JSON dataset here";
}
```

---

## 4. Evaluate Multiple Tests with the Evaluator

The `Evaluator` is designed to run evaluations over a set of tests with minimal setup. This is ideal for running and scoring entire datasets.

Open `Program.cs` (or your main application file) and replace its contents with:

```csharp
using EvalSharp;
using EvalSharp.Scoring;

namespace EvalSample
{
    class Program
    {
        static async Task Main()
        {
            // 1. Load your test data
            var tests = SummaryInputOutput.TestDataSet;

            // 2. Initialize the Evaluator with your LLM, test data, and mapping
            var evaluator = Evaluator.FromJson<SummaryInputOutput>(ChatClient.GetInstance(), tests, test => new EvaluatorTestData
            {
                InitialInput = test.Input,
                ActualOutput = test.ActualOutput,
            });

            // 3. Choose your metrics
            evaluator.AddGEval(criteria: "Does the output correctly explain concepts, events, or processes based on the input prompt?");
            evaluator.AddAnswerRelevancy();

            // 4. Run the evaluator. Results automatically print to the console.
            var result = await evaluator.RunAsync();
        }
    }
}
```

---

## 5. Run Your Evaluation

```bash
dotnet run
```

You'll see output similar to:

```
You're running EvalSharps's GEval Metric!(using gpt-4.1-mini, strict = False, async_mode = True)...
You're running EvalSharps's AnswerRelevancy Metric!(using gpt-4.1-mini, strict = False, async_mode = True)...
Evaluating 10 test case(s) in parallel:
                                                     Test Results
                                        ┌───────────┬─────────────────┬───────┐
                                        │ Test case │ AnswerRelevancy │ GEval │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 1         │ ✅              | ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 2         │ ✅              │ ✅   │
                                        └───────────┴─────────────────┴───────┘
                                                     Metric Results
┌─────────────────┬────────────────────────────────────────────────────────────────────┬────────┬──────────────────────┐
│ Metric          │ Score                                                              │ Status │ Overall Success Rate │
├─────────────────┼────────────────────────────────────────────────────────────────────┼────────┼──────────────────────┤
│ AnswerRelevancy │ 10 (threshold=0.5, strict: False, evaluation model=gpt-4.1-mini)   │ Pass   │ 100.0%               │
├─────────────────┼────────────────────────────────────────────────────────────────────┼────────┼──────────────────────┤
│ GEval           │ 8.523471008249098 (threshold=0.5, strict: False, evaluation        │ Pass   │ 85.23471008249098.0% │
│                 │ model=gpt-4.1-mini)                                                │        │                      │
└─────────────────┴────────────────────────────────────────────────────────────────────┴────────┴──────────────────────┘
======================================================================

Metrics Summary

  - ✅ (AnswerRelevancy) (score: 1
, threshold: 0.5, strict: False, reason: The score is 1.00 because the response fully addresses the UN's concerns about
the global economic challenges, including unemployment, poverty, and supply chain issues, and highlights the need for
fiscal support and sustainable development without any irrelevant information., error: None)
  - ✅ (GEval) (score: 0.8924141813188683
, threshold: 0.5, strict: False, reason: The Actual Output accurately summarizes the Initial Input, mentioning the UN's
warning about global economic challenges due to the pandemic, including unemployment, poverty, and supply chain
disruptions. It also reflects the note on some countries recovering, lingering uncertainty, and the emphasis on fiscal
support and sustainable development policies. However, it is slightly less detailed and does not mention deep recessions
explicitly or urge governments strongly, resulting in a minor deduction., error: None)

For test case:

  - input: The United Nations has warned that the global economy is facing severe challenges, with many countries
experiencing deep recessions due to the ongoing pandemic. In a new report, the UN highlights the increasing unemployment
rates, widespread poverty, and disruptions to supply chains. While some countries are beginning to show signs of
recovery, the overall situation remains uncertain. Governments are urged to prioritize fiscal support and sustainable
development policies to avoid long-term economic stagnation.
  - actual output: The UN has warned about global economic challenges caused by the pandemic, highlighting issues such
as unemployment, poverty, and supply chain disruptions. Some countries are recovering, but uncertainty remains, with an
emphasis on fiscal support and sustainable development.
  - expected output: None
  - context: None
  - retrieval context: None
======================================================================
...
```

---

## 6. Evaluate a Single Test in Unit Tests with `EvalTest.AssertAsync`

In addition to evaluating large datasets, you can easily evaluate a single test with multiple metrics directly in your unit tests using `EvalTest.AssertAsync`. This is perfect for testing specific scenarios or including evaluation logic in your automated test suites.

Example with multiple metrics:

```csharp
using EvalSharp.Models;
using EvalSharp.Scoring;
using Xunit.Abstractions;

public class MyEvalTests
{
    private readonly ITestOutputHelper _testOutputHelper;
    public MyEvalTests(ITestOutputHelper testOutputHelper)
    {
        _testOutputHelper = testOutputHelper;
    }

    [Fact]
    public async Task SingleTest_MultipleMetrics()
    {
        var context = new EvaluatorTestData
        {
            InitialInput = "Summarize the meeting.",
            ActualOutput = "The meeting summary is provided below...",
        };

        var metrics = new List<Metric>
        {
            new AnswerRelevancyMetric(ChatClient.GetInstance(), new AnswerRelevancyMetricConfiguration { Threshold = 0.9 }),
            new GEvalMetric(ChatClient.GetInstance(), new GEvalMetricConfiguration { Threshold = 0.5, Criteria = "Does the output correctly explain concepts, events, or processes based on the input prompt?" })
        };

        await EvalTest.AssertAsync(context, metrics, _testOutputHelper.WriteLine);
    }
}
```

You'll see output similar to:

```
❌ EvalSharp.Tests.EvalAssertTests.Testing_Assert_Two_Tests
   Source: EvalAssertTests.cs line 19
   Duration: 4.2 sec

  Message: 
EvalSharp.Exceptions.EvalFailException : Metrics: GEval (score: 0.06, threshold: 0.5, strict: False) failed.

  Stack Trace: 
EvalTest.AssertAsync(EvaluatorTestData testData, List`1 metrics, Action`1 sink) line 76
EvalAssertTests.Testing_Assert_Two_Tests() line 47
--- End of stack trace from previous location ---

  Standard Output: 
┌───────────┬─────────────────┬────────────────────────────────────────────────────────────────────────────────┬────────┬──────────────────────┐
│ Test case │ Metric          │ Score                                                                          │ Status │ Overall Success Rate │
├───────────┼─────────────────┼────────────────────────────────────────────────────────────────────────────────┼────────┼──────────────────────┤
│ 1         │ AnswerRelevancy │ 1 (threshold=0.9, evaluation model=gpt-4.1-mini, reason=The score is 1.00      │ Pass   │ 53.22%               │
│           │                 │ because the response fully addresses the request to summarize the meeting with │        │                      │
│           │                 │ no irrelevant statements, providing a clear and concise summary.)              │        │                      │
│           │ GEval           │ 0.06444263535522285 (threshold=0.5, evaluation model=gpt-4.1-mini, reason=The  │ Fail   │                      │
│           │                 │ Actual Output does not provide any content beyond a placeholder statement      │        │                      │
│           │                 │ ('The meeting summary is provided below...'), whereas the Expected Output is   │        │                      │
│           │                 │ empty. This indicates a failure to summarize the meeting as requested,         │        │                      │
│           │                 │ resulting in a score near the bottom.)                                         │        │                      │
└───────────┴─────────────────┴────────────────────────────────────────────────────────────────────────────────┴────────┴──────────────────────┘

```

✅ With `EvalTest.AssertAsync`, you can:

- Assert against multiple metrics in a single call
- Output results to any desired sink (e.g., `Console.WriteLine`, test output helpers)
- Quickly integrate EvalSharp into existing unit tests without full dataset setup

---

## That's It! 🎉

You're ready to start evaluating LLM output using EvalSharp for both large-scale dataset evaluations and quick, targeted unit tests.
