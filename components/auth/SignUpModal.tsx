import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Input from '../common/Input'
import palette from '../../styles/palette'
import Selector from '../common/Selector'
import { dayList, monthList, yearList } from '../../lib/staticData'
import Button from '../common/Button'
import { signupAPI } from '../../lib/api/auth'
import useValidateMode from '../../hooks/useValidateMode'
import PasswordWarning from './passwordWarning'
import { authActions } from '../../store/auth'
import { useDispatch } from 'react-redux'
import { constant } from '../../lib/constant'
import { hasBirthday, isPasswordHasNameOrEmail, isPasswordHasNumberOrSymbol, isPasswordOverMinLength, isSamePassword, validationSignUpForm } from '../../lib/validation'
import CloseXIcon from '../../public/static/svg/modal/close.svg'
import MailIcon from '../../public/static/svg/auth/mail.svg'
import PersonIcon from '../../public/static/svg/auth/person.svg'
import OpenedEyeIcon from '../../public/static/svg/auth/opened-eye.svg'
import ClosedEyeIcon from '../../public/static/svg/auth/closed-eye.svg'
import WarningIcon from '../../public/static/svg/common/warning.svg'

const Container = styled.form`
  width: 568px;
  padding: 32px;
  background-color: white;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }

  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;

    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      flex-grow: 1;
    }

    .sign-up-modal-birthday-year-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-signin {
    color: ${palette.dark_cyan};
    margin-left: 8px;
    cursor: pointer;
  }

  .selector-warning {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }

    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`

// 선택할 수 없는 월 option
const DISABLED_MONTHS = ['Month']
// 선택할 수 없는 일 option
const DISABLED_DAYS = ['Day']
// 선택할 수 없는 년 option
const DISABLED_YEARS = ['Year']

interface IProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [birthYear, setBirthYear] = useState<string | undefined>()
  const [birthMonth, setBirthMonth] = useState<string | undefined>()
  const [birthDay, setBirthDay] = useState<string | undefined>()

  const [isSelectedBirthday, setIsSelectedBirthday] = useState(true)

  const [passwordFocused, setPasswordFocused] = useState(false)

  useEffect(() => {
    if (hasBirthday(birthMonth, birthDay, birthYear)) {
      setIsSelectedBirthday(true)
    }
  }, [birthMonth, birthDay, birthYear])

  const dispatch = useDispatch()

  // 비밀번호 인풋 포커스 되었을 때
  const onFocusPassword = () => {
    setPasswordFocused(true)
  }

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value)
  }

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onChangeCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value)
  }

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword)
  }

  const onChangeMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value)
  }

  const onChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value)
  }

  const onChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value)
  }

  const changeToSignInModal = () => {
    dispatch(authActions.setAuthMode('signIn'))
  }

  const { setValidateMode } = useValidateMode()

  // 회원가입 폼 제출하기
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // input 컴포넌트에서 store 값 사용
    setValidateMode(true)

    if (!hasBirthday(birthMonth, birthDay, birthYear)) {
      setIsSelectedBirthday(false)
    } else {
      setIsSelectedBirthday(true)
    }

    const userInfo = {
      email: email,
      password: password,
      lastname: lastname,
      firstname: firstname,
      birthMonth: birthMonth,
      birthDay: birthDay,
      birthYear: birthYear
    }
    if(validationSignUpForm(userInfo)) {
      try {
        const signUpBody = {
          transaction_time: new Date(),
          data: {
            email,
            lastname,
            firstname,
            password,
            birthday: `${birthYear!.replace('Year', '')}/${birthMonth!.replace('Month', '')}/${birthDay!.replace('Day', '')}`
          }
        }
        await signupAPI(signUpBody)
        closeModal()
      } catch (e) {
        console.log(e)
      }
    }
  }

  // 언마운트시 ValidateMode를 false로 함
  useEffect(() => {
    return () => {
      setValidateMode(false)
    }
  }, [])

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="Email Address"
          type={constant.INPUT_TYPES.EMAIL}
          icon={<MailIcon />}
          name={constant.SIGNIN_ITEMS.EMAIL}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.EMAIL}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="Last Name(ex: Smith)"
          icon={<PersonIcon />}
          name={constant.SIGNIN_ITEMS.LAST_NAME}
          value={lastname}
          onChange={onChangeLastname}
          useValidation
          isValid={!!lastname}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.LAST_NAME}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="First Name(ex: John)"
          icon={<PersonIcon />}
          name={constant.SIGNIN_ITEMS.FIRST_NAME}
          value={firstname}
          onChange={onChangeFirstname}
          useValidation
          isValid={!!firstname}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.FIRST_NAME}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="Password"
          type={hidePassword ? constant.INPUT_TYPES.PASSWORD : constant.INPUT_TYPES.TEXT}
          name={constant.INPUT_TYPES.PASSWORD}
          value={password}
          onChange={onChangePassword}
          icon={hidePassword ? (
            <ClosedEyeIcon onClick={toggleHidePassword} />
          ) : (
            <OpenedEyeIcon onClick={toggleHidePassword} />
          )}
          useValidation
          isValid={!isPasswordHasNameOrEmail(password, email, lastname) && isPasswordOverMinLength(password) && !isPasswordHasNumberOrSymbol(password)}
          errorMessage={constant.ERROR_MESSAGES.REQUIRED.PASSWORD}
          onFocus={onFocusPassword}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="Check the Password"
          type={hidePassword ? constant.INPUT_TYPES.PASSWORD : constant.INPUT_TYPES.TEXT}
          name={constant.SIGNIN_ITEMS.CHECK_PASSWORD}
          value={checkPassword}
          onChange={onChangeCheckPassword}
          icon={hidePassword ? (
            <ClosedEyeIcon onClick={toggleHidePassword} />
          ) : (
            <OpenedEyeIcon onClick={toggleHidePassword} />
          )}
          useValidation
          isValid={!!checkPassword && isSamePassword(password, checkPassword)}
          errorMessage={constant.ERROR_MESSAGES.SAME.CHECK_PASSWORD}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning isValid={isPasswordHasNameOrEmail(password, email, lastname)} text='Can not inclues EMAIL or NAME' />
          <PasswordWarning isValid={!isPasswordOverMinLength(password)} text='Minimum 8 characters' />
          <PasswordWarning isValid={isPasswordHasNumberOrSymbol(password)} text='Must inclues Number and Symbol' />
        </>
      )}
      <p className="sign-up-birthday-label">Birthday</p>
      <p className="sign-up-modal-birthday-info">
        Only 18 years of age or older can join. <br />Your birthday is not disclosed to other users.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={DISABLED_MONTHS}
            defaultValue={constant.SIGNIN_ITEMS.MONTH}
            value={birthMonth}
            onChange={onChangeMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={DISABLED_DAYS}
            defaultValue={constant.SIGNIN_ITEMS.DAY}
            value={birthDay}
            onChange={onChangeDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={DISABLED_YEARS}
            defaultValue={constant.SIGNIN_ITEMS.YEAR}
            value={birthYear}
            onChange={onChangeYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      {!isSelectedBirthday && (
        <div className='selector-warning'>
          <WarningIcon />
          <p>{constant.ERROR_MESSAGES.REQUIRED.BIRTHDAY}</p>
        </div>
      )}
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit" color='bittersweet'>Submit</Button>
      </div>
      <p>
        Do you have the account already?
        <span
         className='sign-up-modal-set-signin'
         role='presentation'
         onClick={changeToSignInModal}
        >
          Sign In
        </span>
      </p>
    </Container>
  )
}

export default SignUpModal
