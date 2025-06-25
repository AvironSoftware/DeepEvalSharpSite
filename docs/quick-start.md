# Quick Start

Follow these steps to get up and running with EvalSharp in minutes.

## Prerequisites

- .NET SDK 8.0 or later
- A code editor or IDE (e.g., Visual Studio, Visual Studio Code)
- (Optional) An API key (e.g., `OPENAI_API_KEY`) for LLM‑evaluated metrics

## 1. Create a .NET Project

```bash
mkdir EvalSample
cd EvalSample
dotnet new console
```

## 2. Install EvalSharp

```bash
dotnet add package EvalSharp
```

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

    public static string TestDataSet =
"""
        [
            {
                "input": "The United Nations has warned that the global economy is facing severe challenges, with many countries experiencing deep recessions due to the ongoing pandemic. In a new report, the UN highlights the increasing unemployment rates, widespread poverty, and disruptions to supply chains. While some countries are beginning to show signs of recovery, the overall situation remains uncertain. Governments are urged to prioritize fiscal support and sustainable development policies to avoid long-term economic stagnation.",
                "actual_output": "The UN has warned about global economic challenges caused by the pandemic, highlighting issues such as unemployment, poverty, and supply chain disruptions. Some countries are recovering, but uncertainty remains, with an emphasis on fiscal support and sustainable development.",
                "expected_output": "The United Nations has warned that the global economy is facing challenges due to the pandemic, with rising unemployment, poverty, and supply chain disruptions. While some nations are recovering, the global outlook remains uncertain, urging governments to prioritize fiscal support and sustainable development."
            },
            {
                "input": "A major wildfire broke out in California, threatening thousands of homes and forcing evacuations in several communities. Firefighters have been working tirelessly to contain the blaze, which has already spread across several thousand acres. The fire's origin is still under investigation, but it has been fueled by dry conditions and high winds. Authorities are urging residents to stay alert and follow evacuation orders to ensure their safety.",
                "actual_output": "A wildfire in California is threatening homes and forcing evacuations. Firefighters are working to contain the blaze, which has spread across thousands of acres. Dry conditions and high winds are fueling the fire, with authorities urging residents to evacuate.",
                "expected_output": "A massive wildfire in California is threatening thousands of homes and leading to evacuations. The fire has spread across thousands of acres, fueled by dry conditions and strong winds. Firefighters are working to contain it, and residents are advised to follow evacuation orders to ensure safety."
            },
            {
                "input": "Researchers have discovered a new species of whale off the coast of Antarctica. The species, which has been named the Antarctic Blue Whale, was spotted during an expedition aimed at studying marine life in the Southern Ocean. Scientists believe that the species could provide valuable insights into the behavior and migration patterns of whales in cold-water regions. The discovery is expected to contribute to ongoing conservation efforts to protect endangered marine species.",
                "actual_output": "A new species of whale, the Antarctic Blue Whale, has been discovered off the coast of Antarctica during a research expedition. The species may provide important insights into whale behavior and migration in cold-water regions and support conservation efforts.",
                "expected_output": "A newly discovered species of whale, the Antarctic Blue Whale, was found off Antarctica's coast during a marine life expedition. This species could provide valuable insights into whale behavior and migration in cold-water regions, contributing to conservation efforts."
            },
            {
                "input": "The government has announced new policies aimed at reducing carbon emissions and combating climate change. These policies include stricter regulations on industrial pollution, incentives for renewable energy adoption, and investments in green technologies. Experts are optimistic that these efforts could help meet international climate goals, although challenges remain in implementation. The government plans to work with private companies and environmental organizations to ensure the success of these policies.",
                "actual_output": "The government has introduced new policies to reduce carbon emissions, including stricter industrial pollution regulations, incentives for renewable energy, and investments in green technologies. While challenges exist, experts are hopeful that these measures will help meet climate goals.",
                "expected_output": "The government has unveiled new policies designed to cut carbon emissions and address climate change, such as stricter pollution regulations, renewable energy incentives, and green technology investments. Experts are optimistic about reaching climate targets, despite implementation challenges."
            },
            {
                "input": "NASA has announced plans to launch a new mission to explore the surface of Mars. The mission, scheduled for next year, will focus on studying the planet's geology, atmosphere, and potential for supporting life. Scientists are particularly excited about the possibility of discovering signs of ancient microbial life. The mission will include a rover, which will collect soil samples and send them back to Earth for further analysis.",
                "actual_output": "NASA is set to launch a new mission to explore Mars next year. The focus will be on studying its geology, atmosphere, and potential for life. Scientists hope to discover signs of ancient microbial life, and a rover will collect samples for analysis.",
                "expected_output": "NASA plans to launch a Mars exploration mission next year, focused on studying the planet's geology, atmosphere, and potential for life. The mission aims to discover signs of ancient microbial life, with a rover collecting soil samples to return to Earth for analysis."
            },
            {
                "input": "The stock market has been volatile in recent weeks, with investors reacting to concerns over rising interest rates and global trade tensions. Analysts are warning that the market could experience further turbulence if these issues are not resolved. However, some experts believe that the market will stabilize as companies continue to report strong earnings, particularly in the technology sector.",
                "actual_output": "The stock market has been volatile due to concerns over interest rates and trade tensions. Analysts warn of more turbulence, but some believe the market will stabilize with strong earnings, especially in the tech sector.",
                "expected_output": "The stock market has experienced volatility amid concerns about rising interest rates and global trade tensions. Analysts warn of further turbulence but expect stabilization as companies, especially in the tech sector, report strong earnings."
            },
            {
                "input": "In a surprising turn of events, the president has announced a new policy aimed at reducing income inequality. The policy includes measures such as increased taxes on the wealthiest individuals and corporations, as well as expanded social programs for low-income families. The announcement has sparked debates across the political spectrum, with critics arguing that the plan could harm the economy, while supporters claim it will help reduce poverty and create a more equitable society.",
                "actual_output": "The president has announced a policy to reduce income inequality, including higher taxes on the wealthy and expanded social programs for low-income families. The move has sparked debate, with critics warning of economic harm and supporters advocating for greater equity.",
                "expected_output": "The president's new policy aims to reduce income inequality by raising taxes on the wealthiest individuals and corporations and expanding social programs for low-income families. While critics argue it could hurt the economy, supporters believe it will foster greater equity and reduce poverty."
            },
            {
                "input": "A new report shows that global temperatures have risen at an alarming rate over the past few decades, with the planet now experiencing its warmest period in recorded history. Scientists attribute this increase to human activities, particularly the burning of fossil fuels. The report urges immediate action to reduce greenhouse gas emissions in order to mitigate the impacts of climate change, which include rising sea levels, more frequent natural disasters, and disruptions to ecosystems.",
                "actual_output": "A new report shows that global temperatures have risen significantly, making this the warmest period in history. Human activities, especially fossil fuel burning, are to blame. The report calls for urgent action to reduce emissions and combat climate change.",
                "expected_output": "A new report reveals that global temperatures have increased significantly, marking the warmest period in recorded history. The rise is attributed to human activities, especially fossil fuel consumption. Immediate action is needed to cut emissions and address climate change's impacts."
            },
            {
                "input": "A new study has found that regular exercise can have a significant impact on mental health, reducing the symptoms of depression and anxiety. The study, which involved thousands of participants, found that those who exercised regularly reported higher levels of well-being and lower levels of stress. Researchers are encouraging people to incorporate physical activity into their daily routines to improve mental health and overall quality of life.",
                "actual_output": "A new study has found that regular exercise can improve mental health, reducing symptoms of depression and anxiety. Participants who exercised regularly reported better well-being and lower stress. Researchers recommend incorporating exercise into daily routines.",
                "expected_output": "A study has found that regular exercise significantly improves mental health by reducing depression and anxiety symptoms. Participants who exercised regularly reported better well-being and less stress, prompting researchers to encourage physical activity for better mental health."
            },
            {
                "input": "The city has unveiled a new initiative to improve public transportation, which includes the construction of new subway lines and the expansion of bus routes. The plan is aimed at reducing traffic congestion and promoting sustainable urban mobility. The city government has committed to investing billions of dollars into the project over the next decade. Experts believe that the initiative will have a positive impact on the environment and quality of life for residents.",
                "actual_output": "The city has launched a new initiative to improve public transportation, including new subway lines and expanded bus routes. The project aims to reduce traffic and promote sustainability, with billions in investments over the next decade.",
                "expected_output": "The city has announced a major initiative to enhance public transportation, featuring new subway lines and expanded bus routes. The goal is to reduce traffic congestion and promote sustainable mobility, with billions in investments planned over the next decade."
            }
        ]

        """;
}
```

## 4. Write Your First Evaluation

Open `Program.cs` (or your main application file) and replace its contents with:

```csharp
using EvalSharp;
using EvalSharp.Scoring;

namespace EvalSample
{
    class Program
    {
        static void Main()
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

## 4. Run Your Evaluation

```bash
dotnet run
```

You should see an output similar to:

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
                                        ├───────────┼─────────────────┼───────┤
                                        │ 3         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 4         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 5         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 6         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 7         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 8         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 9         │ ✅              │ ✅   │
                                        ├───────────┼─────────────────┼───────┤
                                        │ 10        │ ✅              │ ✅   │
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

Metrics Summary

  - ✅ (AnswerRelevancy) (score: 1
, threshold: 0.5, strict: False, reason: The score is 1.00 because the response directly addresses the wildfire
situation with relevant details and advice. There are no irrelevant statements, making the answer fully pertinent to the
input., error: None)
  - ✅ (GEval) (score: 0.8148047194272745
, threshold: 0.5, strict: False, reason: The Actual Output accurately captures the core details from the Initial Input
including the wildfire's spread, threat to homes, evacuations, firefighting efforts, causes (dry conditions and high
winds), and authorities' warnings. It is clear and concise, directly addressing the concepts requested. However, it
omits that the fire has spread across "several thousand acres" and that the fire's origin is still under investigation,
which are present in the Initial Input. The Expected Output is not provided, but given the close match in key
information, the response is aligned well with anticipated completeness and correctness., error: None)

For test case:

  - input: A major wildfire broke out in California, threatening thousands of homes and forcing evacuations in several
communities. Firefighters have been working tirelessly to contain the blaze, which has already spread across several
thousand acres. The fire's origin is still under investigation, but it has been fueled by dry conditions and high winds.
Authorities are urging residents to stay alert and follow evacuation orders to ensure their safety.
  - actual output: A wildfire in California is threatening homes and forcing evacuations. Firefighters are working to
contain the blaze, which has spread across thousands of acres. Dry conditions and high winds are fueling the fire, with
authorities urging residents to evacuate.
  - expected output: None
  - context: None
  - retrieval context: None
======================================================================
...
```
