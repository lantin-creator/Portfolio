import BtnComponent from "./BtnComponent"

const Btn = () => {
    return(
    <div>
        <div className="btncontainer">
            <BtnComponent href="https://t.me/lant1n" className="fototg" />
            <BtnComponent href="https://github.com/lantin-creator" className="fotogithub" />
            <BtnComponent href="mailto:shusik121@gmail.com" className="fotomail" />
            <BtnComponent href="tel:+79255507234" className="fotonumber" />
        </div>
        <BtnComponent href="#MyWork" className="myWork" MyWork={true}>Мои работы</BtnComponent>
    </div>
    )
}

export default Btn