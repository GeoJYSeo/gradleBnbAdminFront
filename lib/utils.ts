import jwt from 'jsonwebtoken'

// export const cookiesStringToObject = (cookieString: string | undefined) => {
//   const cookies: { [key: string]: string } = {}

//   if (cookieString) {
//     // token=value
//     const itemString = cookieString?.split(/\s*;\s*/)
//     itemString.forEach((pairs) => {
//       // [token,value]
//       const pair = pairs.split(/\s*=\s*/)
//       cookies[pair[0]] = pair.splice(1).join("=")
//     })
//   }
//   return cookies
// }

// IDToken 가져오기
// Get IDToken
export const getLocalIdToken = () => {
  let idToken = null;

  if (typeof window !== 'undefined') {
    idToken = window.localStorage.getItem('IDToken')
  }

  return idToken
}

// LocalStorage 삭제
// delete LoaclStorage
export const deleteLocalIdToken = () => {
  window.localStorage.removeItem('IDToken')
}

// jwt 에서 email 추출
// Extract the email from JWT
export const getEmailFromJwt = () => {
  const jwtToken = getLocalIdToken()
  try {
    const { email } = JSON.parse(JSON.stringify(jwt.verify(jwtToken!, process.env.NEXT_PUBLIC_JWT_SECRET!)))
    return email
  } catch (e) {
    return null
  }
}

// string 에서 number 만 return 하는 함수
// return only numbers in the string
export const getNumber = (string: string) => {
  // 문자열에서 숫자를 전부 찾음
  const numbers = string.match(/\d/g)?.join('')
  if (numbers) {
    return Number(numbers)
  }
  return null
}

// 금액을 입력하면 금액에 ,를 넣어주는 함수
// add , in the price
export const makeMoneyString = (input: string) => {
  const amountString = input.replace(/[^0-9]/g, "");
  if (amountString) {
    return parseInt(amountString, 10).toLocaleString();
  }
  return "";
};

// query string 만들기
// make query string
export const makeQueryString = (baseUrl: string, queriesObject: Object & { [key: string]: any }) => {
  const keys = Object.keys(queriesObject)
  const values = Object.values(queriesObject)

  if (keys.length === 0) {
    return baseUrl
  }

  let queryString = `${baseUrl}?`
  keys.forEach((key, index) => {
    if (queriesObject[key]) {
      queryString += `${keys[index]}=${values[index]}&`
    }
  })

  // 마지막 & 제거하기
  // remove last &
  return queryString.slice(0, -1)
}
