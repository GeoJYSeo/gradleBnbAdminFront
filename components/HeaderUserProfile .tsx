import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useDispatch } from "react-redux";
import HamburgerIcon from '../public/static/svg/header/hamburger.svg'
import Link from "next/link";
import { userActions } from "../store/user";
import { useSelector } from "../store";

const HeaderUserProfile: React.FC = () => {
  const [isUsermenuOpened, setIsUsermenuOpened] = useState(false)
  const room = useSelector((state) => state.room.detail)

  const dispatch = useDispatch();

  const setRoomInfo = () => {
    console.log(111)
  }

  const logout = async () => {
    try {
      localStorage.removeItem('IDToken')
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
          {!!room ?
            <Link href='/room/register/building'>
              <a
                role='presentation'
                onClick={() => {
                  setIsUsermenuOpened(false)
                  setRoomInfo()
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
