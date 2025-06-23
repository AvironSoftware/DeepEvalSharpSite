# Prompt Alignment Metric

The Prompt Alignment Metric evaluates whether an LLM-generated `ActualOutput` aligns with the instructions specified in your prompt template, using an LLM-as-a-judge, referenceless approach. It flags deviations and provides a reason for its score, making it a self-explaining LLM-Eval tool.

#### When you should use Prompt Alignment Metric

- **Ensuring Instruction Adherence** – Use this metric to verify that responses follow the explicit instructions in your prompt template.
- **Validating Prompt Template Changes** – Check that updates to prompt instructions yield properly aligned outputs.
- **Benchmarking Models on Prompt Following** – Compare different LLMs or fine-tuned versions on their ability to follow prompt instructions.

#### When you SHOULDN'T use Prompt Alignment Metric

- **Measuring Factual Accuracy or Relevance** – This metric only evaluates instruction alignment, not correctness or coverage.
- **Reference-Based Validation** – Use metrics like Hallucination or Faithfulness for context-backed fact checking.
- **Evaluating Creative or Open-Ended Text** – Strict instruction enforcement may not be appropriate for creative or narrative tasks.

## How to use

The Prompt Alignment Metric requires `InitialInput` and `ActualOutput` to function. You can instantiate an Prompt Alignment metric with optional parameters to customize its behavior.

Add Prompt Alignment Metric to your evaluator:

| Method                                                                                                                            | Description                                                       |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `AddPromptAlignment(List<string> promptInstructions, bool includeReason = true, bool strictMode = false, double threshold = 0.5)` | Creates the Prompt Alignment metric and adds it to the evaluator. |
| `AddPromptAlignment(PromptAlignmentMetricConfiguration config)`                                                                   | Creates the Prompt Alignment metric and adds it to the evaluator. |

Here's an example of how to use Prompt Alignment metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "Summarize this medical report for a patient in plain English. Do not include any medical jargon.",
        LLMOutput   = "The report says your heart is healthy and there are no signs of serious problems. Your blood pressure and cholesterol levels are normal.",
        GroundTruth = "The report says your heart is healthy and there are no signs of serious problems. Your blood pressure and cholesterol levels are normal."
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
evaluator.AddPromptAlignment(promptInstructions: ["Summarize for a patient", "Use plain English", "Avoid medical jargon"], includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `InitialInput` | A string That represents the initial input is the user interaction with the LLM. |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.        |

### Required Configuration Parameters

| Parameter            | Description                                                                           |
| -------------------- | ------------------------------------------------------------------------------------- |
| `PromptInstructions` | List of strings that represent instructions to validate against the model's response. |

### Optional Configuration Parameters

| Parameter       | Description                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`     | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `IncludeReason` | A boolean that, when set to `True`, provides a reason for the metric score. Default is `True`.                      |
| `StrictMode`    | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
