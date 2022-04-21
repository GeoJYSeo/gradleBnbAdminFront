import { isEmpty } from "lodash";
import { FirstStepInfo, SecondStepInfo } from "../types/reduxState";
import { UserValidationType } from "../types/user";

// 비밀번호 최소 자리수
const PASSWORD_MIN_LENGTH = 4;

export const isPresence = (value: string) => !!value

// 비밀번호가 이름이나 이메일을 포함하는지
export const isPasswordHasNameOrEmail = (password: string, email: string, lastname: string) =>
  !password || !lastname || password.includes(lastname) || password.includes(email.split('@')[0])

// 비밀번호가 최소 자릿수 이상인지
export const isPasswordOverMinLength = (password: string) =>
  !!password && password.length >= PASSWORD_MIN_LENGTH

// 비밀번호가 숫자나 특수기호를 포함하는지
export const isPasswordHasNumberOrSymbol = (password: string) =>
  !(/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) || /[0-9]/g.test(password))

// 비밀번호 체크
export const isSamePassword = (password: string, checkPassword: string) =>
  password === checkPassword

// 생년월일 필수
export const hasBirthday = (birthMonth: string | undefined, birthDay: string | undefined, birthYear: string | undefined) => {
  // 생년월일 셀렉터 값이 없다면
  if (!birthDay || !birthMonth || !birthYear) {
    return false
  }
  return true
}

// 회원가입 폼 입력 값 확인하기
export const validationSignUpForm = (userInfo: UserValidationType) => {
  // 인풋 값이 없다면
  if (!userInfo.email || !userInfo.lastname || !userInfo.firstname || !userInfo.password) {
    return false
  }

  // 비밀번호가 올바르지 않다면
  if (isPasswordHasNameOrEmail(userInfo.password, userInfo.email, userInfo.lastname) || !isPasswordOverMinLength(userInfo.password) || isPasswordHasNumberOrSymbol(userInfo.password)) {
    return false
  }

  if (!hasBirthday(userInfo.birthMonth, userInfo.birthDay, userInfo.birthYear)) {
    return false
  }

  return true
}

// 숙소 등록 1단계
export const firstStepInRegistration = (firstStepInfo: FirstStepInfo) => {
  // 모든 값이 있는지 확인하기
  if (!firstStepInfo.largeBuildingType || !firstStepInfo.buildingType || !firstStepInfo.roomType || !firstStepInfo.isSetUpForGuest === null) {
    return false
  }
  return true
}

// 숙소 등록 2단계
export const secondStepValidation = (secondStepInfo: SecondStepInfo) => {
  // 모든 값이 있는지 확인하기
  if (!secondStepInfo.bedroomCount || (isEmpty(secondStepInfo.bedList) || isEmpty(secondStepInfo.publicBedList))) {
    return false
  }
  return true
}
