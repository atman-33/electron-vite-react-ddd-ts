import Versions from '@renderer/components/Versions';
import electronLogo from '../../assets/electron.svg';

const DebugPage = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping');

  return (
    <>
      <img alt="logo" className="logo h-20" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a
            className="text-blue-600 underline"
            href="https://electron-vite.org/"
            target="_blank"
            rel="noreferrer"
          >
            Documentation
          </a>
        </div>
        <div className="my-2">
          <button className="rounded-md bg-blue-800 px-2 py-1" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </button>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
};

export default DebugPage;
