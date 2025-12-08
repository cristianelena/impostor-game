import { ScreenLayout } from './components/layout/ScreenLayout';
import { useGameStore } from './store/gameStore';
import { Lobby } from './views/Lobby';
import { TopicSelection } from './views/TopicSelection';
import { Reveal } from './views/Reveal';
import { Game } from './views/Game';
import { Sorting } from './views/Sorting';
import { Voting } from './views/Voting';
import { Results } from './views/Results';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const phase = useGameStore((state) => state.phase);

  return (
    <ScreenLayout>
      <AnimatePresence mode="wait">
        {phase === 'LOBBY' && (
          <motion.div
            key="lobby"
            className="h-full"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.3 }}
          >
            <Lobby />
          </motion.div>
        )}
        {phase === 'TOPIC_SELECTION' && (
          <motion.div
            key="topics"
            className="h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <TopicSelection />
          </motion.div>
        )}
        {phase === 'REVEAL' && (
          <motion.div
            key="reveal"
            className="h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Reveal />
          </motion.div>
        )}
        {phase === 'PLAYING' && (
          <motion.div
            key="game"
            className="h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Game />
          </motion.div>
        )}
        {phase === 'SORTING' && (
          <motion.div
            key="sorting"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Sorting />
          </motion.div>
        )}
        {phase === 'VOTING' && (
          <motion.div
            key="voting"
            className="h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Voting />
          </motion.div>
        )}
        {phase === 'RESULTS' && (
          <motion.div
            key="results"
            className="h-full"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
          >
            <Results />
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenLayout>
  );
}

export default App;
