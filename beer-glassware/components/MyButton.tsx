import * as React from 'react';

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function MyButton({ children, ...rest }: MyButtonProps) {
  return <button {...rest}>{children}</button>;
}
