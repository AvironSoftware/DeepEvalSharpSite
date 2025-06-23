# Test Cases

## Loading Data into Evaluator

DeepEvalSharp’s `Evaluator` class provides several static methods to load datasets in various formats and wire them up to your evaluation pipeline. Below is a guide to each loader and how to define the mapping to `EvaluatorTestData`.

---

## 1. FromData (In-Memory Collection)

Use when you already have a collection of `EvaluatorTestData` or another type that can be mapped directly.

```csharp
// For EvaluatorTestData collection (no mapping needed)
var evaluator = Evaluator.FromData(chatClient, myTestDataList);

// For custom DTOs, map to EvaluatorTestData
var evaluator2 = Evaluator.FromData<MyDTO>(
    chatClient,
    DTOList,
    // Map each DTO to EvaluatorTestData
    DTO => new EvaluatorTestData {
        InitialInput    = DTO.Prompt,
        ExpectedOutput  = DTO.Expected,
        Context          = DTO.GoldContext,
        RetrievalContext = DTO.RetrievedDocs
    }
);
```

---

## 2. FromJson (Single JSON String)

Deserialize a JSON array of objects into your type, then map.

```csharp
string json = File.ReadAllText("test-cases.json");
var evaluator = Evaluator.FromJson<MyRecord>(
    chatClient,
    json,
    record => new EvaluatorTestData {
        InitialInput    = record.Question,
        ExpectedOutput  = record.Answer,
        Context          = record.ReferenceSnippets
    }
);
```

- **jsonOptions** (optional): pass `JsonSerializerOptions` for casing or custom converters.

---

## 3. FromJsonLines (NDJSON / JSON Lines)

Load newline-delimited JSON (one object per line).

```csharp
IEnumerable<string> lines = File.ReadLines("ndjson.txt");
var evaluator = Evaluator.FromJsonLines<MyRecord>(
    chatClient,
    lines,
    record => new EvaluatorTestData {
        InitialInput    = record.Input,
        ExpectedOutput  = record.Output
    }
);
```

---

## 4. FromJsonFile (JSON File)

Shortcut to read and parse a JSON file in one call.

```csharp
var evaluator = Evaluator.FromJsonFile<MyRecord>(
    chatClient,
    filePath: "data/test-cases.json",
    map: record => new EvaluatorTestData {
        InitialInput   = record.Query,
        ExpectedOutput = record.Result
    }
);
```

---

## 5. FromCsv (CSV String)

Parse CSV text into your DTO, then map.

```csharp
string csv = File.ReadAllText("cases.csv");
var evaluator = Evaluator.FromCsv<MyCsvModel>(
    chatClient,
    csv,
    csvModel => new EvaluatorTestData {
        InitialInput   = csvModel.Prompt,
        ExpectedOutput = csvModel.Expected
    },
    config: new CsvHelper.Configuration.CsvConfiguration(CultureInfo.InvariantCulture)
);
```

---

## 6. FromCsvFile (CSV File)

Load and parse a CSV file directly.

```csharp
var evaluator = Evaluator.FromCsvFile<MyCsvModel>(
    chatClient,
    filePath: "cases.csv",
    map: csvModel => new EvaluatorTestData {
        InitialInput   = csvModel.Question,
        ExpectedOutput = csvModel.Answer,
        Context         = csvModel.GoldContext.Split("|").ToList()
    }
);
```

---

## Mapping Tips

- **Type parameter `T`** can be `EvaluatorTestData` itself, in which case your map expression can be `c => c`.
- Use C# 9 **record types** or **DTO classes** with properties matching your file schema.
- If your data type already _is_ `EvaluatorTestData`, prefer `FromData(chatClient, data)` to skip mapping.

With these loaders, you can seamlessly plug in any data source—JSON, CSV, or in-memory collections—into DeepEvalSharp’s evaluation engine.
