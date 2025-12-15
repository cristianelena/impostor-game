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

import { synth } from './utils/synth';
import { useEffect, useRef } from 'react';
import { useLocalNotifications } from './hooks/useLocalNotifications';

function App() {
  const phase = useGameStore((state) => state.phase);
  const prevPhase = useRef(phase);
  const { requestPermission } = useLocalNotifications();

  useEffect(() => {
    // Request permission on first interaction implicitly or here if user engages
    // Best practice is usually on a button click, but we can init the hook logic here
  }, []);

  // Expose requestPermission to be called possibly after a game ends or on first click
  useEffect(() => {
    const handleInteraction = () => {
      requestPermission();
      window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, [requestPermission]);

  useEffect(() => {
    // Sync phase changes to URL hash
    const targetHash = phase === 'TOPIC_SELECTION' ? 'topics' : phase.toLowerCase();

    // Prevent duplicate history entries if hash matches
    if (window.location.hash.slice(1) === targetHash) return;

    const isGamePhase = (p: string) => ['REVEAL', 'SORTING', 'PLAYING', 'VOTING', 'RESULTS'].includes(p);

    // Logic for history navigation
    if (prevPhase.current === 'RESULTS' && phase === 'TOPIC_SELECTION') {
      // If going back to topics from results (reset), go back in history
      // instead of pushing new state if possible
      window.history.back();
    } else if (isGamePhase(prevPhase.current) && isGamePhase(phase)) {
      // Replace history during game progression
      window.history.replaceState(null, '', `#${targetHash}`);
    } else {
      // Push new entry for major navigation
      window.history.pushState(null, '', `#${targetHash}`);
    }

    prevPhase.current = phase;
  }, [phase]);

  useEffect(() => {
    // Handle back button / history navigation
    const handlePopState = () => {
      const hash = window.location.hash.slice(1);

      switch (hash) {
        case 'lobby': useGameStore.setState({ phase: 'LOBBY' }); break;
        case 'topics': useGameStore.setState({ phase: 'TOPIC_SELECTION' }); break;
        case 'reveal': useGameStore.setState({ phase: 'REVEAL' }); break;
        case 'sorting': useGameStore.setState({ phase: 'SORTING' }); break;
        case 'playing': useGameStore.setState({ phase: 'PLAYING' }); break;
        case 'voting': useGameStore.setState({ phase: 'VOTING' }); break;
        case 'results': useGameStore.setState({ phase: 'RESULTS' }); break;
        default: break;
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Set initial hash if empty
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#lobby');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Play swoosh on phase change
    synth.playSwoosh();

    // Update Document Title
    const baseTitle = "Impostor Game";
    let subTitle = "";

    switch (phase) {
      case 'LOBBY': subTitle = "Jugadores"; break;
      case 'TOPIC_SELECTION': subTitle = "Elige un Tema"; break;
      case 'REVEAL': subTitle = "Asignación de perfiles"; break;
      case 'SORTING': subTitle = "Quien comienza?"; break;
      case 'PLAYING': subTitle = "Juguemos!"; break;
      case 'VOTING': subTitle = "Votemos!"; break;
      case 'RESULTS': subTitle = "El impostor era..."; break;
    }

    document.title = subTitle ? `${baseTitle} - ${subTitle}` : baseTitle;
  }, [phase]);

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
