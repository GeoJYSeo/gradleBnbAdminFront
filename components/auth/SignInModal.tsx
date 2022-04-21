import styled from "styled-components";
import palette from "../../styles/palette";
import Input from "../common/Input";
import CloseXIcon from '../../public/static/svg/modal/close.svg'
import MailIcon from '../../public/static/svg/auth/mail.svg'
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg'
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg'
import Button from "../common/Button";
import React, { useEffect, useState } from "react";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { signinAPI } from "../../lib/api/auth";
import useValidateMode from "../../hooks/useValidateMode";
import { constant } from "../../lib/constant";
import { userActions } from "../../store/user";
import { isPresence } from "../../lib/validation";

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .signin-input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .signin-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .signin-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .signin-modal-set-signup {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }
`

interface IProps {
  closeModal: () => void
}

const SignInModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hasEmail, setHasEmail] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)

  const [isPasswordHided, setIsPasswordHided] = useState(true)

  const {setValidateMode} = useValidateMode()

  const dispatch = useDispatch()

  // 이메일 주소 변경시
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  // 비밀번호 변경시
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided)
  }

  const changeToSignUpModal = () => {
    dispatch(authActions.setAuthMode('signUp'))
  }

  const validationSignInForm = () => {
    if (!email || !password) {
      return false
    }
    return true
  }

  // 로그인 클릭시
  const onSubmitSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setValidateMode(true)

    setHasEmail(!isPresence(email))
    setHasPassword(!isPresence(password))
    
    if (validationSignInForm()) {
      const signinBody = {
        email,
        password,
      }

      try {
        const { data } = await signinAPI(signinBody)
        localStorage.setItem('IDToken', data.data.access_token!)
        closeModal()
        dispatch(userActions.setLoggedUser(data.data.user_api_response))
      } catch (e) {
        console.log(e)
      }
    } 
  }
  
  useEffect(() => {
    return () => {
      setValidateMode(false)
    }
  }, [])

  return (
    <Container onSubmit={onSubmitSignin}>
      <CloseXIcon className='modal-close-x-icon' onClick={closeModal} />
      <div className='signin-input-wrapper'>
        <Input
          placeholder='Email Address'
          name={constant.SIGNIN_ITEMS.EMAIL}
          type={constant.INPUT_TYPES.EMAIL}
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          isValid={!hasEmail}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.EMAIL}
        />
      </div>
      <div className='signin-input-wrapper signin-password-input-wrapper'>
        <Input
          placeholder='Password'
          name={constant.SIGNIN_ITEMS.PASSWORD}
          type={isPasswordHided ? constant.INPUT_TYPES.PASSWORD : constant.INPUT_TYPES.TEXT}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          value={password}
          onChange={onChangePassword}
          isValid={!hasPassword}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.PASSWORD}
        />
      </div>
      <div className='signin-modal-submit-button-wrapper'>
        <Button type='submit' color='bittersweet'>Sign In</Button>
      </div>
      <p>
        Do you wanna join us?
        <span
          className='signin-modal-set-signup'
          role='presentation'
          onClick={changeToSignUpModal}
        >
          sign Up
        </span>
      </p>
    </Container>
  )
}

export default SignInModal
