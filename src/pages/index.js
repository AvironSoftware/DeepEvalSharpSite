import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="LLMTest.NET"
      description="Powerful, developer-friendly tools for evaluating LLMs in .NET">
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Test Your LLMs Like a Pro</h1>
          <p className={styles.subtitle}>
            LLMTest.NET brings powerful, fun, and developer-friendly tools for evaluating large language models directly inside your .NET projects.
          </p>
          <div className={styles.githubLinks}>
            <a href="#">MIT License</a>
            <a href="#">v1.2.3</a>
            <a href="#">NuGet Downloads: 42,000+</a>
          </div>
        </header>

        <section className={styles.features}>
          <h2>Why You'll Love It</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>Supercharged Metrics</h3>
              <p>Evaluate response quality with custom metrics or plug in your own logic — zero ceremony.</p>
            </div>
            <div className={styles.feature}>
              <h3>Plug & Play</h3>
              <p>Add it to your unit tests and CI pipelines like magic. No ML experience needed.</p>
            </div>
            <div className={styles.feature}>
              <h3>Friendly for .NET Devs</h3>
              <p>Written in C# with love. Deep integration with xUnit, NUnit, and MSTest.</p>
            </div>
            <div className={styles.feature}>
              <h3>Explainable Results</h3>
              <p>Get visual feedback on failures, score breakdowns, and model comparisons.</p>
            </div>
          </div>
        </section>

        <section className={styles.codeSection}>
          <h2>Sample C# Code</h2>
          <pre><code>{`using LLMTest;

public class MyTest
{
    [Fact]
    public void Should_Answer_Correctly()
    {
        var result = LLM.Evaluate("What is 2 + 2?", "4");
        Assert.True(result.IsPass);
    }
}`}</code></pre>
        </section>
      </main>
    </Layout>
  );
}
