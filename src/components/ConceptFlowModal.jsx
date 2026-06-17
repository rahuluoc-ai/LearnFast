import FlowPlayer from './FlowPlayer';
import styles from './ConceptFlowModal.module.css';

export default function ConceptFlowModal({ animation, onClose }) {
  if (!animation) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.modal} role="dialog" aria-label={`${animation.title} concept flow`}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <FlowPlayer
          title={animation.title}
          subtitle={animation.subtitle}
          frames={animation.frames}
        />
      </div>
    </>
  );
}
