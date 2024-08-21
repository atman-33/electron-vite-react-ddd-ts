import { useState } from 'react';

export function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions);

  return (
    <ul className="flex gap-4">
      <li className="">Electron v{versions.electron}</li>
      <li className="">Chromium v{versions.chrome}</li>
      <li className="">Node v{versions.node}</li>
    </ul>
  );
}
