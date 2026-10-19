import StekComponent from "./StekComponent"

const Stek = () => {
    return(
        <div className = "stekconteiner">
            <StekComponent className = {["MainSkill1", "MainSkill2", "MainSkill3"]} StekClass="Mainstek" NameStek="Основной стек" StekTextClass="Mainstektext"
        TetxStek="JavaScript, React, TypeScript.  
    Уверенно работаю с DOM, событиями, асинхронностью и современным синтаксисом JS.  
    Разрабатываю компоненты на React, использую хуки и управление состоянием.  
    Пишу на TypeScript, постепенно перевожу проекты на него." />
        <StekComponent className = {["SecondarySkill1", "SecondarySkill2", "SecondarySkill3"]} StekClass="Secondarystek" NameStek="Второстепенный стек" StekTextClass="Secondarystektext"
        TetxStek="Git, GitHub, Node.js, npm.  
    Работаю с системами контроля версий, пишу бекенд на node.js.  
    Собираю проекты на Vite, управляю зависимостями через npm.  
    Изучаю бэкенд: Express, Supabase, Prisma, SQL/NoSQL.  
    В ближайших планах — API, JWT-авторизация, Redis." />
        </ div>
    )
}

export default Stek