import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { ErrorBoundary } from '@/components/ErrorPages/ErrorBoundary';
import { NotFound } from '@/components/ErrorPages/NotFound';
import '@/styles/globals.css';

const root = document.getElementById('root');
if (!root) throw new Error('Elemento #root não encontrado.');

/** O portfólio é uma página única: qualquer outro caminho mostra a tela 404. */
const KNOWN_PATHS = ['/', '/index.html'];
const isKnown = KNOWN_PATHS.includes(window.location.pathname.replace(/\/+$/, '') || '/');

/** Só em desenvolvimento: abra /?simular-erro para ver a tela 500. */
function CrashTest(): never {
  throw new Error('erro simulado via ?simular-erro');
}
const simulateCrash = import.meta.env.DEV && new URLSearchParams(window.location.search).has('simular-erro');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      {simulateCrash ? (
        <CrashTest />
      ) : isKnown ? (
        <App />
      ) : (
        <MotionConfig reducedMotion="user">
          <NotFound />
        </MotionConfig>
      )}
    </ErrorBoundary>
  </StrictMode>,
);
