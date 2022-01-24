import styled from "styled-components";
import { RootState, useSelector } from "../../store"
import SignInModal from "./SignInModal"
import SignUpModal from "./SignUpModal"

const Container = styled.div`
  z-index: 11;
`;

interface IProps {
  closeModal: () => void
}

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode)

  return (
    <Container>
      {authMode === 'signUp' && <SignUpModal closeModal={closeModal} />}
      {authMode === 'signIn' && <SignInModal closeModal={closeModal} />}
    </Container>
  )
}

export default AuthModal
