const EASE = [0.16, 1, 0.3, 1];

export const bentoVariants = {
  top: {
    hidden: { opacity: 0, y: -48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0, ease: EASE } },
  },
  center: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.15, ease: EASE } },
  },
  bottomLeft: {
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3, ease: EASE } },
  },
  topRight: {
    hidden: { opacity: 0, y: -48 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.45, ease: EASE } },
  },
  last: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, delay: 0.6, ease: EASE } },
  },
};