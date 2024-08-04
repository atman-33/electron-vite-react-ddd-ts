import { Outlet } from 'react-router-dom';

const DebugLayout = () => {
  return (
    <div className="flex h-full flex-col items-center gap-y-4 bg-slate-800 p-4 text-white">
      <div className="w-full border-b-2 py-4 text-center text-2xl font-bold">DebugLayout</div>
      <Outlet />
    </div>
  );
};

export default DebugLayout;
