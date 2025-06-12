// src/pages/index.js
import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout>

      <main className={styles.main}>
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
              v1.2.3
            </a>
          </div>
        </section>

        <section className={styles.features}>
          <h2>Rapid Evaluations</h2>
          <h3>With These Robust Metrics</h3>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h4>Answer Relevancy</h4>
              <p>Optimized pipelines for lightning-quick LLM evaluations.</p>
            </div>
            <div className={styles.feature}>
              <h4>Bias</h4>
              <p>Plug into your existing tests with almost no setup.</p>
            </div>
            <div className={styles.feature}>
              <h4>Contextual Precision</h4>
              <p>Define your own success criteria in C# or use built-ins.</p>
            </div>
            <div className={styles.feature}>
              <h4>Contextual Recall</h4>
              <p>See pass/fail breakdowns and inline diffs in your CI logs.</p>
            </div>
            <div className={styles.feature}>
              <h4>DAG</h4>
              <p>Optimized pipelines for lightning-quick LLM evaluations.</p>
            </div>
            <div className={styles.feature}>
              <h4>Faithfulness</h4>
              <p>Plug into your existing tests with almost no setup.</p>
            </div>
            <div className={styles.feature}>
              <h4>G-Eval</h4>
              <p>Define your own success criteria in C# or use built-ins.</p>
            </div>
            <div className={styles.feature}>
              <h4>Hallucination</h4>
              <p>See pass/fail breakdowns and inline diffs in your CI logs.</p>
            </div>
            <div className={styles.feature}>
              <h4>Prompt Alignment</h4>
              <p>Optimized pipelines for lightning-quick LLM evaluations.</p>
            </div>
            <div className={styles.feature}>
              <h4>Summarization</h4>
              <p>Plug into your existing tests with almost no setup.</p>
            </div>
            <div className={styles.feature}>
              <h4>Task Completion</h4>
              <p>Define your own success criteria in C# or use built-ins.</p>
            </div>
            <div className={styles.feature}>
              <h4>Tool Correctnesss</h4>
              <p>See pass/fail breakdowns and inline diffs in your CI logs.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
