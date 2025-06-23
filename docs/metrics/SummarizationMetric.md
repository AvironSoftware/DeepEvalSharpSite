# Summarization Metric

The Summarization Metric leverages an LLM as a judge to assess if your model’s `ActualOutput` is both factually accurate and sufficiently comprehensive when compared to the original `InitialInput`. It generates two sub-scores—a contradiction-and-fabrication–detecting alignment score and a key-information–measuring coverage score—takes the lower of the two as the final result, and supplies a human-readable explanation for its judgment, making it a self-explaining LLM-Eval tool.

#### When you should use Summarization Metric

- **Assessing Summary Fidelity** – Ensure summaries accurately reflect source text without fabrications or contradictions.
- **Evaluating Information Coverage** – Verify that the summary includes all necessary details from the original content.
- **Benchmarking Summarization Quality** – Compare different models or configurations on their ability to generate faithful, comprehensive summaries.

#### When you SHOULDN'T use Summarization Metric

- **Fact-Checking with Explicit References** – For context-backed validation, metrics like Hallucination or Faithfulness are more appropriate.
- **Creative or Abstracted Summaries** – If you require imaginative rewrites rather than faithful representation.
- **High-Throughput/Cacheable Requirements** – As a non-cacheable metric requiring multiple LLM calls, it may not suit large-scale pipelines.

## How to use

The Summarization Metric requires `InitialInput` and `ActualOutput` to function. You can instantiate an Summarization metric with optional parameters to customize its behavior. If AssessmentQuestions are provided, NumQuestions will be ignored as NumQuestions is used for asking the LLM to create the AssessmentQuestions for when they're not provided.

Add Summarization Metric to your evaluator:

| Method                                                                                                                                                              | Description                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `AddSummarization(int numQuestions = 5, int? truthsExtractionLimit = null, bool includeReason = true, bool strictMode = false, double threshold = 0.5)`             | Creates the Summarization metric and adds it to the evaluator. |
| `AddSummarization(List<string> assessmentQuestions, int? truthsExtractionLimit = null, bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Summarization metric and adds it to the evaluator. |
| `AddSummarization(SummarizationMetricConfiguration config)`                                                                                                         | Creates the Summarization metric and adds it to the evaluator. |

Here's an example of how to use Summarization metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "A study on sleep patterns found that adults who sleep 7-8 hours a night perform better on cognitive tests and report better mental health. The study analyzed 10,000 adults across the US.",
        LLMOutput   = "A US study of 10,000 adults found that sleeping 7-8 hours improves mental health and cognitive performance."
    }
};

// 2) Create evaluator, mapping your case → EvaluatorTestData
var evaluator = Evaluator.FromData(
    ChatClient.GetInstance(),
    cases,
    c => new EvaluatorTestData
    {
        InitialInput    = c.UserInput,
        ActualOutput    = c.LLMOutput
    }
);

// 3) Add metric and run
evaluator.AddSummarization(assessmentQuestions: [
                "Does the summary mention that the study included 10,000 adults?",
                "Does the summary correctly identify 7-8 hours of sleep as the optimal range?",
                "Does the summary mention improved cognitive performance as a result?",
                "Does the summary include improved mental health as a finding?",
                "Does the summary indicate that the study was conducted in the US?"
            ]);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `InitialInput` | A string That represents the initial input is the user interaction with the LLM. |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.        |

### Optional Configuration Parameters

| Parameter               | Description                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `NumQuestions`          | Integer representing number of assessment questions to generate when none are provided. Defaults to 5.                         |
| `TruthsExtractionLimit` | Integer representing the maximum number of factual claims to extract from the original text (input); null lets the LLM choose. |
| `AssessmentQuestions`   | List strings that represent of close-ended questions to assess summary quality that can be answered with yes or no.            |
| `Threshold`             | A float representing the minimum passing score, defaulting to 0.5.                                                             |
| `IncludeReason`         | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                                 |
| `StrictMode`            | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`.            |
