// src/pages/index.js
import React, { useState, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';  

export default function Home() {
  const terminalRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const command = 'dotnet add package MassTransit';
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Layout>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Test Your LLMs Like a Pro</h1>
          <p className={styles.subtitle}>
            DeepEvalSharp brings powerful and developer-friendly tools for evaluating
            large language models directly inside your .NET projects.
          </p>

          <div className={`${styles.terminal} ${copied ? styles.copied : ''}`}
              onClick={handleCopy}
              ref={terminalRef}>
            <div className={styles.terminalheader}>
              <div className={styles.trafficlightswrapper}>
                <div className={styles.trafficlights}>
                  <span className={styles.close}></span>
                  <span className={styles.minimize}></span>
                  <span className={styles.maximize}></span>
                </div>
              </div>
              <div className={styles.terminaltitlewrapper}>
                <strong className={styles.terminaltitle}>Bash</strong>
              </div>
            </div>
            <div className={styles.terminalbody}>
              <div className={styles.promptline}>
                <span className={styles.promptsymbol}>$</span>
                <code>dotnet add package DeepEvalSharp</code>
              </div>
            </div>
            <div className={styles.terminaloverlay}>
              <span>Copied!</span>
            </div>
            <div className={styles.terminaltooltip}>Click to copy</div>
          </div>

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
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Answer Relevancy</h4>
              <p>Measure how relevant the LLM’s response is to the user’s query, ensuring on-topic, directly useful answers. </p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Bias</h4>
              <p>Quantifies unwanted prejudice or skew in model outputs so you can detect and mitigate fairness issues.</p>
            </Link>
            <Link to="docs/ContextualPrecisionMetric" className={styles.feature}>
              <h4>Contextual Precision</h4>
              <p>Checks that the retrieved context contains only the most pertinent information for a given query.</p>
            </Link>
            <Link to="docs/ContextualRecallMetric" className={styles.feature}>
              <h4>Contextual Recall</h4>
              <p>Evaluates how comprehensively the retrieval context covers all necessary details to address a query.</p>
            </Link>
            <Link to="docs/DAGMetric" className={styles.feature}>
              <h4>DAG</h4>
              <p>Uses a decision-tree to break evaluation into atomic checks for fine-grained reliability.</p>
            </Link>
            <Link to="docs/FaithfulnessMetric" className={styles.feature}>
              <h4>Faithfulness</h4>
              <p>Assesses whether outputs are factually supported by the source context, preventing unsupported or fabricated claims.</p>
            </Link>
            <Link to="docs/GEvalMetric" className={styles.feature}>
              <h4>G-Eval</h4>
              <p>A general-purpose evaluator that leverages chain-of-thought prompting to align LLM quality judgments with human preferences.</p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Hallucination</h4>
              <p>Detects when the model fabricates or “hallucinates” information not grounded in the provided context, guarding against false statements.</p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Prompt Alignment</h4>
              <p>Measures how closely the model’s output follows the structure, style, or instructions specified in the prompt.</p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Summarization</h4>
              <p>Rates the conciseness, coherence, and completeness of generated summaries relative to the source text.</p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Task Completion</h4>
              <p>Determines whether the model successfully performs the requested task from end to end, verifying operational effectiveness.</p>
            </Link>
            <Link to="docs/AnswerRelevancyMetric" className={styles.feature}>
              <h4>Tool Correctnesss</h4>
              <p>Checks if the model correctly invokes and uses external functions or tools in agentic workflows, ensuring proper tool usage.</p>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
