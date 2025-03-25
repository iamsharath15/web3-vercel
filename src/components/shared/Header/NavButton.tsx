'use client';

import { motion } from 'framer-motion';

interface NavMenuToggleProps {
  menuOpen: boolean;
  setMenuOpen: (_: boolean) => void;
}
const NavButton: React.FC<NavMenuToggleProps> = ({ menuOpen, setMenuOpen }) => {
  const path1Variants = {
    open: { d: 'M4.06061 2.99999L21.0606 21' },
    closed: { d: 'M0 8.5L24 8.5' },
  };
  const path2Variants = {
    open: { d: 'M3.00006 21.0607L21 3.06064' },
    closed: { d: 'M0 15.5L24 15.5' },
  };
  const path3Variants = {
    open: { opacity: 0 },
    closed: { d: 'M0 12L24 12', opacity: 1 },
  };

  return (
    <div
      onClick={() => setMenuOpen(!menuOpen)}
      className="relative justify-self-center flex flex-col gap-2 cursor-pointer stroke-white stroke-2 z-50"
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <motion.path
          variants={path1Variants}
          initial="closed"
          animate={menuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          variants={path2Variants}
          initial="closed"
          animate={menuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
        <motion.path
          variants={path3Variants}
          initial="closed"
          animate={menuOpen ? 'open' : 'closed'}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </div>
  );
};

export default NavButton;
