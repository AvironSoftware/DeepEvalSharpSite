// sidebars.js
// @ts-check

/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'quick-start',
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    'test-cases',
    'datasets',
    {
      type: 'category',
      label: 'Metrics',
      items: [
        'metrics/AnswerRelevancyMetric',
        'metrics/BiasMetric',
        'metrics/ContextualPrecisionMetric',
        'metrics/ContextualRecallMetric',
        'metrics/CustomMetric',
        'metrics/FaithfulnessMetric',
        'metrics/GEvalMetric',
        'metrics/HallucinationMetric',
        'metrics/MatchMetric',
        'metrics/PromptAlignmentMetric',
        'metrics/SummarizationMetric',
        'metrics/TaskCompletionMetric',
        'metrics/ToolCorrectnessMetric',
      ],
    },
  ],
};

export default sidebars;

