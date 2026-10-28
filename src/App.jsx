import { AnimatePresence, MotionConfig } from 'framer-motion';
import 'lenis/dist/lenis.css';
import { useCallback, useEffect, useState } from 'react';
import Background from './components/layout/Background';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import SideRails from './components/layout/SideRails';
import Toaster from './components/ui/Toaster';
import { initSmoothScroll } from './lib/scroll';
import { prefersReducedMotion } from './lib/utils';
import Home from './pages/Home';

const INTRO_KEY = 'intro-seen';

// The intro plays once per browser session and never for reduced-motion users.
function shouldShowIntro() {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [loading, setLoading] = useState(shouldShowIntro);

  useEffect(() => initSmoothScroll(), []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Storage unavailable: the intro simply plays again next time.
    }
    setLoading(false);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <AnimatePresence>{loading && <Loader key="loader" onDone={finishIntro} />}</AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <SideRails />
          <main id="main" className="overflow-x-clip">
            <Home />
          </main>
          <Footer />
        </>
      )}

      <Toaster />
    </MotionConfig>
  );
}
