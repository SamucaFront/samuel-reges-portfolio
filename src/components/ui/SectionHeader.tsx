import { motion } from 'framer-motion';
import { RevealText } from './RevealText';
import { fadeUp, viewport } from '@/utils/motion';

interface Props {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
  id: string;
}

export function SectionHeader({ index, label, title, subtitle, id }: Props) {
  return (
    <header className="mb-14 sm:mb-20">
      <div className="mb-8 flex items-center justify-between border-t border-line pt-4">
        <span className="meta">
          <span className="text-accent">({index})</span> — {label}
        </span>
        <span className="meta hidden sm:inline">sr://{id}</span>
      </div>
      <RevealText text={title} className="section-title" />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-6 max-w-xl text-base text-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
