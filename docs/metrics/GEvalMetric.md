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

The GEval Metric requires `InitialInput` and `ActualOutput` to function. You can instantiate an GEval metric with optional parameters to customize its behavior.

Add GEval Metric to your evaluator:

| Method                                                                                           | Description                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AddGEval(string criteria, bool strictMode = false, double threshold = 0.5)`                     | Creates the GEval metric and adds it to the evaluator. The criteria that you specify will be given to an LLM and turned into a set of evaluation steps that the LLM will use to evaluate the model's output. |
| `AddGEval(IEnumerable<string> evaluationSteps, bool strictMode = false, double threshold = 0.5)` | Creates the GEval metric and adds it to the evaluator. The evaluation steps are steps that the LLM will use to evaluate the model's output.                                                                  |
| `AddGEval(GEvalMetricConfiguration config)`                                                      | Creates the GEval metric and adds it to the evaluator.                                                                                                                                                       |

Here's an example of how to use GEval metric:

```csharp
// 1) Prepare your data
var cases = new[]
{
    new TType
    {
        UserInput    = "The United Nations has warned that the global economy is facing severe challenges, with many countries experiencing deep recessions due to the ongoing pandemic. In a new report, the UN highlights the increasing unemployment rates, widespread poverty, and disruptions to supply chains. While some countries are beginning to show signs of recovery, the overall situation remains uncertain. Governments are urged to prioritize fiscal support and sustainable development policies to avoid long-term economic stagnation.",
        LLMOutput   = "The United Nations has issued a warning that the global economy is facing significant challenges, with numerous countries experiencing some very bad things. In a newly released report, the UN emphasizes the rising unemployment rates, increasing levels of poverty, and major disruptions to supply chains that have affected economies worldwide. While certain countries have started to show early signs of recovery, the overall economic outlook remains highly uncertain. The report urges governments to take proactive measures, prioritizing fiscal support and implementing sustainable development policies to prevent long-term economic stagnation and ensure a more stable future.",
        GroundTruth = "The United Nations has warned that the global economy is facing challenges due to the pandemic, with many things that make it difficult for these nations. While some nations are recovering, the global outlook remains uncertain, urging governments to prioritize fiscal support and sustainable development."
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
evaluator.AddGEval(criteria: "Is the summary shorter than the original article without omitting key details?", includeReason: true);
var result = await evaluator.RunAsync();
```

### Required Data Fields

| Parameter      | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `InitialInput` | A string That represents the initial input is the user interaction with the LLM. |
| `ActualOutput` | A string That represents the actual output of the test case from the LLM.        |

### Required Configuration Parameters (Only one is required to be specified)

| Parameter         | Description                                                                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Criteria`        | A string criteria that you specify will be given to an LLM and turned into a set of evaluation steps that the LLM will use to evaluate the model's output. If EvaluationSteps are provided, this property will be ignored. |
| `EvaluationSteps` | List of strings that represent each step the LLM should use to evaluate                                                                                                                                                    |

### Optional Configuration Parameters

| Parameter    | Description                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `Threshold`  | A float representing the minimum passing score, defaulting to 0.5.                                                  |
| `StrictMode` | Enforces a binary metric score—1 for perfect relevance, 0 otherwise—setting the threshold to 1. Default is `False`. |
