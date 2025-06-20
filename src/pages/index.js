// src/pages/index.js
import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import Link from '@docusaurus/Link';  
import Terminal from '../components/terminal/terminal';
import Version from '../components/version/version';
import TimeIcon from '@site/static/img/time-icon.svg';
import ComputerIcon from '@site/static/img/computer-icon.svg';
import QuestionIcon from '@site/static/img/question-icon.svg';
import WrenchIcon from '@site/static/img/wrench-icon.svg';
import CodeIcon from '@site/static/img/code-icon.svg';


export default function Home() {
  return (
    <Layout>

      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.leftSide}>
            <section className={styles.hero}>
              <h1 className={styles.title}>Test Your LLMs Like a Pro</h1>
              <p className={styles.subtitle}>
                DeepEvalSharp brings powerful and developer-friendly tools for evaluating
                large language models directly inside your .NET projects.
              </p>
              <div className={styles.buttons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/quick-start">
                  Get Started
                </Link>
              </div>
            </section>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.rightSideItem}>
              <Terminal/>
            </div>
            <div className={styles.rightSideItem}>
              <Version/>
            </div>  
          </div>
        </div>
        <section className={styles.features}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureTitle}>      
                <CodeIcon aria-hidden="true" className={`${styles.svgIcon} ${styles.purpleIcon}`} />
                <h4>Native .NET Evaluator</h4></div>
              <p>DeepEvalSharp brings LLM metrics directly to .NET. Write eval tests in C# with a familiar API.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureTitle}>
                <ComputerIcon aria-hidden="true" className={`${styles.svgIcon} ${styles.yellowIcon}`} />
                <h4>Open LLM Compatibility</h4>
              </div>
              <p>Work with any LLM in .NET. Compare outputs across models seamlessly within your .NET workflows.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureTitle}>
                <QuestionIcon aria-hidden="true" className={`${styles.svgIcon} ${styles.greenIcon}`} />
                <h4>Real-Time Insights</h4>
                </div>
              <p>Inspect outputs, logs, and traces in a beautiful interactive UI that runs locally alongside your .NET apps.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureTitle}>
                <TimeIcon aria-hidden="true" className={`${styles.svgIcon} ${styles.blueIcon}`} />
                <h4>Quickstart in Minutes</h4>
                </div>
              <p>Install via NuGet and start evaluating LLM outputs with a few C# lines. Built-in defaults get you up and running instantly.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureTitle}>
                <WrenchIcon aria-hidden="true" className={`${styles.svgIcon} ${styles.redIcon}`} />
                <h4>Fully Extensible API</h4></div>
              <p>Customize built-in metrics, define new evaluation criteria, or plug in your own scoring logic—all through a clean, extensible C# API.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
