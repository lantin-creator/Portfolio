import type { ReactNode } from 'react';

type MenuComponentProps = {
  className?: string;
  href?: string;
  NeedALink?: boolean;
  children?: ReactNode;
  isActive?: boolean;
};

const MenuComponent = ({
  className = '',
  href = '',
  NeedALink = false,
  children,
  isActive = false,
}: MenuComponentProps) => {
  return (
    <div className={className} style={{color: isActive ? '#FF0000' : '#F5F5F5'}}>
      {NeedALink ? <a href={href}>{children}</a> : children}
    </div>
  );
};

export default MenuComponent;