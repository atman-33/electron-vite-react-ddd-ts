import { Meta, StoryObj } from '@storybook/react/*';
import { BrowserRouter } from 'react-router-dom';
import { SidebarNav } from './SidebarNav';

const meta: Meta<typeof SidebarNav> = {
  title: 'Components/SidebarNav',
  component: SidebarNav,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  args: {
    navItems: [
      {
        title: '🏠Home',
        href: '/',
        items: []
      },
      {
        title: '🚀Dashboard',
        items: [
          { title: 'Customers', href: '/customers' },
          { title: 'Orders', href: '/orders' },
          { title: 'Products', href: '/products' },
          { title: 'Invoices', href: '/invoices' }
        ]
      },
      {
        title: '🔧Settings',
        items: [
          { title: 'Users', href: '/users' },
          { title: 'Roles', href: '/roles' }
        ]
      }
    ]
  }
};
