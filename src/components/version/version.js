import styles from './version.module.css';
import ShieldIcon from '@site/static/img/shield-icon.svg';
import FlagIcon from '@site/static/img/flag-icon.svg';

export default function Version() {
    return (
              <div className={styles.punchouts}>
                  <a href="#">
                    <ShieldIcon className={styles.icon} />
                    MIT License
                  </a>
                  <a href="https://github.com/AvironSoftware/DeepEvalSharp">
                    <FlagIcon className={styles.icon} />
                    v0.1.2-alpha
                  </a>
              </div>
    );
}