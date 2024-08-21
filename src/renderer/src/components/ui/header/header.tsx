import { Link } from 'react-router-dom';
import electronLogo from '../../../assets/electron.svg';
import { ModeToggle } from '../mode-toggle';

interface HeaderProps {
  /** リンク先 */
  href: string;
}

export const Header = (props: HeaderProps) => {
  const { href } = props;

  return (
    <header className="flex justify-center gap-4">
      <Link to={href} className="flex items-center gap-2">
        <img alt="logo" className="logo h-8" src={electronLogo} />
        <div className="text-2xl font-bold">Electron Vite React TS</div>
        <div className="mx-4 text-base font-bold">
          <span className="rounded-md bg-zinc-800 px-2 py-1 text-white">F12</span> to open the
          devTool
        </div>
      </Link>
      <ModeToggle />
    </header>
  );
};
