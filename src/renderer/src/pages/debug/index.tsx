import Versions from '@renderer/components/ui/versions/Versions';
import electronLogo from '../../assets/electron.svg';

const DebugPage = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  return (
    <>
      <img alt="logo" className="h-20" src={electronLogo} />
      <div>Powered by electron-vite</div>
      <div>
        Build an Electron app with <span className="font-bold text-blue-400">React</span>
        &nbsp;and <span className="font-bold text-blue-400">TypeScript</span>
      </div>
      <p>
        Please try pressing <code className="rounded-md bg-zinc-950 p-2">F12</code> to open the
        devTool
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <a
            className="text-blue-600 underline"
            href="https://electron-vite.org/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
        </div>
        <div className="">
          <button className="rounded-md bg-blue-800 p-2" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </button>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
};

export default DebugPage;
