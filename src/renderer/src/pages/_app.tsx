import { Link, Outlet } from 'react-router-dom';

/**
 * トップレベルのレイアウト。
 * generoutedでは、レイアウトをトップレベルとそれ以外で分けて定義している。
 * - トップレベル: _app.tsx
 * - トップレベル以外: _layout.tsx
 * @returns
 */
const RootLayout = () => {
  return (
    <>
      <Link to="/">
        <div className="text-blue-600 underline">Home</div>
      </Link>
      <Outlet />
    </>
  );
};

export default RootLayout;
