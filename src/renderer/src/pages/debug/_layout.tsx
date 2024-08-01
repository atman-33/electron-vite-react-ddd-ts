import { Outlet } from 'react-router-dom';

const DebugLayout = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 bg-slate-800 py-4 text-zinc-300">
      <div>DebugLayout</div>
      <Outlet />
    </div>
  );
};

export default DebugLayout;
