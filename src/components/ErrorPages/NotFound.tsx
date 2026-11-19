import { ErrorScreen } from './ErrorScreen';

export function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="Lost in the code"
      message="A página que você procurou não existe ou mudou de endereço. Use o terminal abaixo ou volte para o início."
      signature="Oops..."
      path={typeof window !== 'undefined' ? window.location.pathname : '/'}
    />
  );
}
