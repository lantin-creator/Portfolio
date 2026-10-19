import type { ReactNode } from 'react';

type BtnComponentProps = {
    href?: string;
    className?: string;
    children?:  ReactNode;
    MyWork?: boolean;
};

const BtnComponent = ({
    href = '',
    className = '',
    children,
    MyWork = false,
}: BtnComponentProps ) => {
    return (
       MyWork ? <button className={className}><a href={href}>{children}</a></button> : 
       <a href={href} target="_blank" rel="noreferrer" className="btn"><div className={className}>{children}</div></a>
    )
}

export default BtnComponent