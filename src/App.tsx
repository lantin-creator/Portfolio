import Btn from "./components/Btn/Btn";
import Menu from "./components/Menu/Menu";
import Stek from "./components/Stek/Stek";
import Work from "./components/Work/Work";
import { useTypewriter } from "./components/hooks/useTypewriter";

const TEXTS = ['Павел Орлов', 'Веб-разработчик'] as const;

const App = () => {
  const { text, isStarted } = useTypewriter(TEXTS, {
    typeSpeed: 120,
    deleteSpeed: 50,
    holdDelay: 2000,
    betweenDelay: 1000,
    startDelay: 500,
  });

  return (
    <>
      <Menu/>

      <div id="home">
        <div className="greetings">Здравствуйте, я</div>
        <div className="typingcontainer">
          <span className="typingtext" id="typingtext">{text}</span>
          <span className="cursor" id="cursor" style={{animation: isStarted ? 'blink 0.7s step-end infinite' : 'none',}}>|</span>
        </div>
        <div className="Maintext">
          Фронтенд-разработчик с уверенным знанием JavaScript, React и TypeScript.  
    Разрабатываю адаптивные веб-приложения, работаю с Git и GitHub, использую Vite и npm.  
    Изучаю бэкенд: Node.js, Express, Supabase, Prisma, SQL/NoSQL.  
    В планах — углубление в API, JWT-авторизацию и Redis.  
    Открыт к позициям фронтенд или фуллстек-разработчика с возможностью роста в бэкенд.
        </div>
        <Btn />
      </div>

      <div id="MyStack">
        <div className="HeadlineStack">Мой <span style={{ color: '#E82929' }}>стек</span></div>
        <Stek />
      </div>

      <div id="MyWork">
        <div className="HedlineWork"><span style={{ color: '#E82929' }}>Мои</span> работы</div>
        <Work />
      </div>
    </>
  );
};

export default App;