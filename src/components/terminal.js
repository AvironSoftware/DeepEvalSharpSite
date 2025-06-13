import React, { useState, useRef } from 'react';
import styles from './terminal.module.css';

export default function Terminal() {
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
    );
}