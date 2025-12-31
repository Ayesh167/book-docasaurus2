import type {ReactNode} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface AnimatedCardProps {
  title: string;
  children: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  icon?: string;
}

export default function AnimatedCard({ 
  title, 
  children, 
  color = 'blue',
  icon = '🤖' 
}: AnimatedCardProps): ReactNode {
  return (
    <div className={clsx(styles.animatedCard, styles[color])}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
}