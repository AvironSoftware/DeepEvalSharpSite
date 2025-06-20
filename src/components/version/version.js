import React from 'react';
import styles from './version.module.css';

export default function Version() {
    return (
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
    );
}