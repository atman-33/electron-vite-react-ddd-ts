import { Button } from '@renderer/components/shadcn/ui/button';
import { useState } from 'react';

const IndexPage = () => {
  const [state, setState] = useState('');
  return (
    <div className="flex flex-col items-center">
      <div className="p-8 text-center">Hello Electron Vite React TS</div>

      <Button
        variant="default"
        className="m-4"
        onClick={async () => setState(await window.api.getHello('world'))}
      >
        getHello
      </Button>

      <Button
        variant="default"
        className="m-4"
        onClick={async () => setState(await window.api.getTime())}
      >
        getTime
      </Button>

      <Button
        variant="default"
        className="m-4"
        onClick={async () => setState(await window.api.getProcessCwd())}
      >
        getProcessCwd
      </Button>

      <div>state: {state}</div>
    </div>
  );
};

export default IndexPage;
