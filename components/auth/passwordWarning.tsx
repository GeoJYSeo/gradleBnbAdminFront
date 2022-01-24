import styled from 'styled-components'
import palette from '../../styles/palette'
import RedXIcon from '../../public/static/svg/auth/red_x.svg'
import GreenCheckIcon from '../../public/static/svg/auth/green_check.svg'

const Container = styled.p<{ isValid: boolean }>`
  color: ${({ isValid }) => (isValid ? palette.davidson_orange : palette.green)};
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  svg {
    margin-right: 8px;
    height: 20px;
  }
`

interface IProps {
  isValid: boolean
  text: string
}

const PasswordWarning: React.FC<IProps> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <RedXIcon /> : <GreenCheckIcon />}
      {text}
    </Container>
  )
}

export default PasswordWarning