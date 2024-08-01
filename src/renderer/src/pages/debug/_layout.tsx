import { Outlet } from 'react-router-dom';

const DebugLayout = () => {
  return (
    <>
      <div>DebugLayout</div>
      <Outlet />
    </>
  );
};

export default DebugLayout;
