# Custom Metric

The Custom Metric feature allows you to define your own evaluation logic, either by composing existing DeepEvalSharp metrics or by creating new rules tailored to your application. These user-defined metrics enable bespoke model validation for use cases not covered by out-of-the-box tools.

#### When you should use Custom Metrics

- **Custom Evaluation Logic** – If your use case involves logic combining multiple metrics (e.g., both relevancy and factuality), define a custom score.
- **Don't want LLM as a judge** – Useful when don't want to use _LLM as a judge_ for your evaluations.
- **Compliance and Safety Checks** – Define domain-specific validation criteria to catch policy violations or logic inconsistencies.

#### When you SHOULDN'T use Custom Metrics

- **Generic Evaluation Needs** – If existing metrics like `BiasMetric`, `AnswerRelevancyMetric`, or `FaithfulnessMetric` suffice, use those directly.
- **Out-of-the-box Comparisons** – Use predefined metrics for rapid benchmarking across models and datasets.

## How to use

Custom metrics follow the standard metric interface and derive from the base `Metric<TConfiguration>` class. You can implement your scoring logic using existing DeepEvalSharp metrics or your own custom routines.

Implementing MetricConfiguration is optional, but if you would like more visibility to additional parameters, this is suggested.

### Example 1: Composite Custom Metric (Faithfulness + Answer Relevancy)

This example defines a custom metric that returns the **minimum score** between Faithfulness and Answer Relevancy. It also returns combined reasoning for interpretability.

```csharp
public class FaithfulRelevancyMetric : Metric<FaithfulRelevancyConfiguration>
{
    public FaithfulRelevancyMetric(FaithfulRelevancyConfiguration configuration) : base(configuration) { }

    public override async Task<MetricScore> ScoreAsync(MetricEvaluationContext context)
    {
        var relevancy = Metrics.Relevancy();
        var faithfulness = Metrics.Faithfulness();

        var relevancyScore = await relevancy.ScoreAsync(context);
        var faithfulnessScore = await faithfulness.ScoreAsync(context);

        return SetScoreReasonSuccess(context, relevancyScore, faithfulnessScore);
    }

    public MetricScore SetScoreReasonSuccess(MetricEvaluationContext context, MetricScore relevancyMetric, MetricScore faithfulnessMetric)
    {

        var relevancyScore = relevancyMetric.Score;
        var relevancyReason = relevancyMetric.Reasoning;
        var faithfulnessScore = faithfulnessMetric.Score;
        var faithfulnessReason = faithfulnessMetric.Reasoning;

        // Custom logic to set score
        var compositeScore = Math.Min(relevancyScore, faithfulnessScore);

        var score = Configuration.StrictMode && compositeScore < Configuration.Threshold ? 0 : compositeScore;
        var reason = Configuration.IncludeReason ? relevancyReason + "\n" + faithfulnessReason : null;
        var success = score >= Configuration.Threshold;

        return new MetricScore(context)
        {
            Score = score,
            Reasoning = reason,
            Result = success ? MetricScoreResult.Pass : MetricScoreResult.Fail
        };

    }
}
```

### Example 2: Non-LLM as a Judge Match Metric

This metric uses `MatchMetric.Exact()` to check for word-for-word equality between the `actual_output` and `expected_output`.

```csharp
public class ExactMatchMetric : Metric<MetricConfiguration>
{
    public ExactMatchMetric(MetricConfiguration configuration) : base(configuration) { }

    public override async Task<MetricScore> ScoreAsync(MetricEvaluationContext context)
    {
        var match = MatchMetric.Exact();
        return await match.ScoreAsync(context);
    }
}
```

## Configuration Options

| Parameter        | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `threshold`      | The minimum score required to pass the test (e.g., 0.6).                                           |
| `include_reason` | If `true`, includes a justification for the result.                                                |
| `strict_mode`    | If `true`, enforces binary scoring—1 for perfect match, 0 otherwise. Applies to composite metrics. |

## Notes

- You can extend the `MetricConfiguration` base class to pass additional flags or control scoring behavior.
- You can mix and match any existing DeepEvalSharp metrics within a custom metric.
