import WorkComponent from "./WorkComponent";
import { FOTO_PIZZERIA, FOTO_VPN } from "../hooks/config/carousels";
import "./work.css"

const Work = () => {
  return (
    <div className="Workconteiner">
      <WorkComponent
        nameClass="Work1"
        name="Пиццерия"
        textClass="Pizzeriatext"
        text={`Адаптивный сайт пиццерии с авторизацией, регистрацией и личным кабинетом.
Данные пользователя подтягиваются из базы данных Supabase после входа.
Реализован на React и JavaScript.
В планах — корзина на Supabase с сохранением заказа до оформления и последнего заказа.
Код доступен в репозитории на GitHub.`}
        href="https://github.com/lantin-creator/lantin-creator.github.io.git"
        photos={FOTO_PIZZERIA}
      />

      <WorkComponent
        nameClass="Work2"
        name="ВПН"
        textClass="Pizzeriatext"
        text={`Лендинг, свёрстанный на React с JS для "Покупки" подписки.
В планах — добавить авторизацию с JWT, подключить базу данных Prisma
и сделать сохранение информации и возможность просмотра информации о подписке/трафике/устройсвтах в аккаунте.
Код доступен в репозитории на GitHub.`}
        href="https://github.com/lantin-creator/VPN.git"
        photos={FOTO_VPN}
      />
    </div>
  );
};

export default Work;