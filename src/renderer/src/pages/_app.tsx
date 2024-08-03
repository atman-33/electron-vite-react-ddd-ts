import { Header } from '@renderer/components/layouts/Header';
import { Outlet } from 'react-router-dom';

/**
 * トップレベルのレイアウト。
 * generoutedでは、レイアウトをトップレベルとそれ以外で分けて定義している。
 * - トップレベル: _app.tsx
 * - トップレベル以外: _layout.tsx
 * @returns
 */
const RootLayout = () => {
  return (
    <div className="dark container p-4">
      <Header to="/" />
      <Outlet />
    </div>
  );
};

export default RootLayout;
