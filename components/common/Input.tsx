import React from 'react'
import styled, { css } from 'styled-components'
import { useSelector } from '../../store'
import palette from '../../styles/palette'

// Container type 설정
type InputContainerProps = {
  iconExist: boolean
  isValid: boolean
  useValidation: boolean
}

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }

  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? '0 44px 0 11px' : '0 11px')};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder {
      color: ${palette.gray_76};
    }
    :focus {
      border-color: ${palette.dark_cyan} !important;
    }
  }

  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.tawny};
  }

  // invalid
  ${({ useValidation, isValid }) =>
    useValidation && !isValid && css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.orange};
        & :focus {
          border-color: ${palette.orange};
        }
      }
    `
  }

  // valid
  ${({ useValidation, isValid }) =>
    useValidation && isValid && css`
      input {
        border-color: ${palette.dark_cyan};
      }
    `
  }

  .input-icon-wrapper {
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }
`

// Props type 설정
interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element
  label?: string
  isValid?: boolean
  useValidation?: boolean
  errorMessage?: string
}

const Input: React.FC<IProps> = ({ icon, label, isValid=false, useValidation=true, errorMessage, ...props }) => {
  const validateMode = useSelector((state) => state.common.validateMode)
  return (
    //{validateMode && useValidation}>
    <Container iconExist={!!icon} isValid={isValid} useValidation={true}>
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      <div className='input-icon-wrapper'>{icon}</div>
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className='input-error-message'>{errorMessage}</p>
      )}
    </Container>
  )
}

// 해당 값이 바뀔때만 리렌더링
// re-render only when the value changes
export default React.memo(Input)
