import { Link } from 'react-router-dom';
import electronLogo from '../../assets/electron.svg';
import { ModeToggle } from '../ui/mode-toggle';

interface HeaderProps {
  /** リンク先 */
  to: string;
}

export const Header = (props: HeaderProps) => {
  const { to } = props;

  return (
    <header className="flex justify-center gap-4">
      <Link to={to} className="flex items-center gap-2">
        <img alt="logo" className="logo h-10" src={electronLogo} />
        <div className="text-2xl font-bold">Electron Vite React TS</div>
      </Link>
      <ModeToggle />
    </header>
  );
};
