// src/pages/index.js
import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';  
import Terminal from '../components/terminal';

export default function Home() {
  return (
    <Layout>

      <main className={`${styles.main} ${styles.layoutContainer}`}>
        <div className={styles.content}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Test Your LLMs Like a Pro</h1>
          <p className={styles.subtitle}>
            DeepEvalSharp brings powerful and developer-friendly tools for evaluating
            large language models directly inside your .NET projects.
          </p>

          <div className={styles.punchouts}>
            <a href="#">
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
                />
              </svg>
              MIT License
            </a>
            <a href="#">
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 10V4a2 2 0 0 0-2-2h-6l-8 8 8 8h6a2 2 0 0 0 2-2v-6z"
                />
              </svg>
              v0.1.1-alpha
            </a>
          </div>
        </section>

        <section className={styles.features}>
          <h2>Rapid Evaluations</h2>
          <h3>With These Robust Metrics</h3>
          <div className={styles.featureGrid}>
            <Link to="docs/metrics/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Answer Relevancy</h4>
              <p>Measure how relevant the LLM’s response is to the user’s query, ensuring on-topic, directly useful answers. </p>
            </Link>
            <Link to="docs/metrics/BiasMetric" className={styles.feature}>
              <h4>Bias</h4>
              <p>Quantifies unwanted prejudice or skew in model outputs so you can detect and mitigate fairness issues.</p>
            </Link>
            <Link to="docs/metrics/ContextualPrecisionMetric" className={styles.feature}>
              <h4>Contextual Precision</h4>
              <p>Checks that the retrieved context contains only the most pertinent information for a given query.</p>
            </Link>
            <Link to="docs/metrics/ContextualRecallMetric" className={styles.feature}>
              <h4>Contextual Recall</h4>
              <p>Evaluates how comprehensively the retrieval context covers all necessary details to address a query.</p>
            </Link>
            <Link to="docs/metrics/DAGMetric" className={styles.feature}>
              <h4>DAG</h4>
              <p>Uses a decision-tree to break evaluation into atomic checks for fine-grained reliability.</p>
            </Link>
            <Link to="docs/metrics/FaithfulnessMetric" className={styles.feature}>
              <h4>Faithfulness</h4>
              <p>Assesses whether outputs are factually supported by the source context, preventing unsupported or fabricated claims.</p>
            </Link>
            <Link to="docs/metrics/GEvalMetric" className={styles.feature}>
              <h4>G-Eval</h4>
              <p>A general-purpose evaluator that leverages chain-of-thought prompting to align LLM quality judgments with human preferences.</p>
            </Link>
            <Link to="docs/metrics/HallucinationMetric" className={styles.feature}>
              <h4>Hallucination</h4>
              <p>Detects when the model fabricates or “hallucinates” information not grounded in the provided context, guarding against false statements.</p>
            </Link>
            <Link to="docs/metrics/PromptAlignmentMetric" className={styles.feature}>
              <h4>Prompt Alignment</h4>
              <p>Measures how closely the model’s output follows the structure, style, or instructions specified in the prompt.</p>
            </Link>
            <Link to="docs/metrics/SummarizationMetric" className={styles.feature}>
              <h4>Summarization</h4>
              <p>Rates the conciseness, coherence, and completeness of generated summaries relative to the source text.</p>
            </Link>
            <Link to="docs/metrics/TaskCompletionMetric" className={styles.feature}>
              <h4>Task Completion</h4>
              <p>Determines whether the model successfully performs the requested task from end to end, verifying operational effectiveness.</p>
            </Link>
            <Link to="docs/metrics/ToolCorrectnessMetric" className={styles.feature}>
              <h4>Tool Correctness</h4>
              <p>Checks if the model correctly invokes and uses external functions or tools in agentic workflows, ensuring proper tool usage.</p>
            </Link>
          </div>
        </section>
        </div>
        <div className={styles.terminalSection}>
            <Terminal/>
        </div>
      </main>
    </Layout>
  );
}
