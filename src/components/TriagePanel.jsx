import styles from './TriagePanel.module.css';

export default function TriagePanel({ triage, complexityTable, rescue }) {
  return (
    <section className={styles.section}>
      <div className={styles.band}>
        <div>
          <h2 className={styles.heading}>The 60-second triage</h2>
          <ol className={styles.triage}>
            {triage.map((t) => (
              <li key={t.step}>
                <strong>{t.title}</strong> <span className={styles.q}>{t.detail}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className={styles.heading}>Constraints → target complexity</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Input size n</th>
                <th>Aim for</th>
                <th>Likely</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.n}>
                  <td>{row.n}</td>
                  <td>{row.aim}</td>
                  <td>{row.likely}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.rescue}>
        <strong>If you freeze — run through these</strong>
        <div className={styles.rescueTags}>
          {rescue.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
