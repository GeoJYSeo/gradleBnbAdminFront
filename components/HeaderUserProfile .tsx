import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import HamburgerIcon from '../public/static/svg/header/hamburger.svg'
import Link from "next/link";
import { userActions } from "../store/user";
import { useSelector } from "../store";
import { getRoomAPI } from "../lib/api/room";
import { registerRoomActions } from "../store/registerRoom";
import { RegisterRoomState } from "../types/reduxState";
import { deleteLocalIdToken } from "../lib/utils";

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false)
  const email = useSelector((state) => state.user.email)
  const room = useSelector((state) => state.registerRoom)
  
  const dispatch = useDispatch();
  
  const setRoomInfo = (roomInfo: RegisterRoomState) => {
    dispatch(registerRoomActions.setRegister(roomInfo))
  }

  useEffect(() => {
    getRoomAPI(email).then(res => setRoomInfo(res.data.data[0]))
  }, [])

  const logout = async () => {
    try {
      deleteLocalIdToken()
      dispatch(userActions.initUser())
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isUsermenuOpened) {
          setIsUsermenuOpened(false)
        }
      }}
    >
      <button
        className='header-user-profile'
        onClick={() => setIsUsermenuOpened(!isUsermenuOpened)}
      >
        <HamburgerIcon />
      </button>
      {isUsermenuOpened && (
        <ul className='header-usermenu'>
          <li>Management</li>
          {!!room.id ?
            <Link href='/room/register/building'>
              <a
                role='presentation'
                onClick={() => {
                  setIsUsermenuOpened(false)
                }}
              >
                <li>Modify</li>
              </a>
            </Link>
            :
            <Link href='/room/register/building'>
              <a
                role='presentation'
                onClick={() => {
                  setIsUsermenuOpened(false)
                }}
              >
                <li>Register</li>
              </a>
            </Link>
          }
          <div className='header-usermenu-divider' />
          <li role='presentation' onClick={logout}>
            LogOut
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  )
}

export default HeaderUserProfile;
