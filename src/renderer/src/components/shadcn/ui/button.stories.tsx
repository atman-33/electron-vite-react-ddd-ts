import { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    },
    size: {
      control: { type: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    },
    asChild: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story= StoryObj<typeof Button>;

export const Default :Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  }
}

export const Destructive :Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Button',
  }
}

export const Outline :Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Button',
  }
}

export const Secondary :Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Button',
  }
}

export const Ghost :Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: 'Button',
  }
}

export const Link :Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Button',
  }
}

export const Small :Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: 'Button',
  }
}

export const Large :Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: 'Button',
  }
}