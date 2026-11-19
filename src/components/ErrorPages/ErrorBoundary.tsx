import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorScreen } from './ErrorScreen';

interface State {
  error: Error | null;
}

/** Captura erros de renderização e mostra a tela 500 no lugar de uma página em branco. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  private retry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <ErrorScreen
          code="500"
          title="Something broke"
          message="Um erro inesperado interrompeu a página. Não é você, é o código — tente recarregar ou volte para o início."
          signature="Bug found"
          detail={import.meta.env.DEV ? this.state.error.message : undefined}
          onRetry={this.retry}
        />
      );
    }
    return this.props.children;
  }
}
