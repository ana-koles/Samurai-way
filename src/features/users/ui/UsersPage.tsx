import { useSelector } from "react-redux";
import { Users } from "./Users";
import s from "./Users.module.css";
import { getIsFetched } from "../model/users-selectors";
import { Preloader } from "../../../components/common/preloader/Preloader";

type UsersPageProps = {
}


const UsersPage = (props: UsersPageProps) => {
  const isFetched = useSelector(getIsFetched)

  return (
    <div className={s.content}>
      {isFetched ? <Preloader /> : ''}
      <Users/>
    </div>
  );
}

export default UsersPage