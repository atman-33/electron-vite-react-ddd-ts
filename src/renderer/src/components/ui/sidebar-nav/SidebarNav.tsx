import { Link } from 'react-router-dom';

export interface NavItem {
  title: string;
  href?: string;
  items: {
    title: string;
    href: string;
  }[];
}

interface SidebarNavProps {
  navItems: NavItem[];
}

export const SidebarNav = (props: SidebarNavProps) => {
  const { navItems } = props;

  return navItems?.length ? (
    <div className="flex flex-col gap-y-2">
      {navItems.map((item, index) => (
        <div className="font-bold" key={index}>
          <NavTitle title={item.title} href={item.href} />
          <div className="flex flex-col gap-y-2 py-2 pl-6">
            {item.items.map((item, index) => (
              <Link
                to={item.href}
                key={index}
                className="text-sm text-foreground/60 hover:underline"
              >
                <NavTitle title={item.title} href={item.href} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

const NavTitle = (props: { title: string; href?: string }) => {
  const { title, href } = props;

  return href ? (
    <Link to={href} className="hover:underline">
      {title}
    </Link>
  ) : (
    <div className="text-foreground">{title}</div>
  );
};
