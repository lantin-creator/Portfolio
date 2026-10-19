import type { ReactNode } from "react";

type StekComponentProps = {
    className?: string[];
    StekClass?: string;
    StekTextClass?: string;
    NameStek?: ReactNode;
    TetxStek?: ReactNode;
};

const StekComponent = ({
    className = [],
    StekClass= "",
    StekTextClass="",
    NameStek,
    TetxStek,

}: StekComponentProps ) => {
    return(
        <div className="stekcard">
            {className.map((cls) => (
                <div key={cls} className={cls}></div>
            ))}
            <div className={StekClass}>{NameStek}</div>
            <div className={StekTextClass}>{TetxStek}</div>
        </div>
    )
}

export default StekComponent