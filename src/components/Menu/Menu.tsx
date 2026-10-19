import MenuComponent from "./MenuComponent";
import { useSectionObserver } from "../hooks/useSectionObserver";
import { useMemo } from "react";

const Section = [
  { id: 'home',    menuClass: 'start' },
  { id: 'MyStack', menuClass: 'AboutMe' },
  { id: 'MyWork',  menuClass: 'MyWork' },
] as const;

const Menu = () => {
  const sections = useMemo(() => Section.map(s => ({ id: s.id })), []);
  const activeId = useSectionObserver(sections, { threshold: 0.3 });

  const isActive = (id: string) => id === activeId;

  return (
    <div className="Cap">
      <MenuComponent className="cap-name">Портфолио</MenuComponent>
      <div className="Menu-container">
        <MenuComponent className="start" NeedALink href="#home" isActive={isActive('home')}>
          Начало
        </MenuComponent>
        <MenuComponent className="AboutMe" NeedALink href="#MyStack" isActive={isActive('MyStack')}>
          Мой стек
        </MenuComponent>
        <MenuComponent className="MyWork" NeedALink href="#MyWork" isActive={isActive('MyWork')}>
          Мои работы
        </MenuComponent>
      </div>
    </div>
  );
};

export default Menu;