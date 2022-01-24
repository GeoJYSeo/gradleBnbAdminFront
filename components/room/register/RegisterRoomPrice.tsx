import { useDispatch } from "react-redux";
import styled from "styled-components";
import { makeMoneyString } from "../../../lib/utils";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import Input from "../../common/Input";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 62px 30px 100px;
  width: 445px;

  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }

  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
`

const RegisterRoomPrice: React.FC = () => {
  const dispatch = useDispatch()

  const price = useSelector((state) => state.registerRoom.price)

  // 금액 변경시
  const onChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strPrice = event.target.value

    const numberPrice = Number(strPrice.replace(/,/g, ""))
    if (!numberPrice || numberPrice === 0) {
      dispatch(registerRoomActions.setPrice(0))
    }

    if (numberPrice !== 0) {
      dispatch(registerRoomActions.setPrice(numberPrice))
    }
  }

  return (
    <Container>
      <h2>Please set a pice.</h2>
      <h3>The tenth Step</h3>
      <Input
        label='Base price'
        value={makeMoneyString(String(price))}
        onChange={onChangePrice}
        maxLength={13}
        isValid
      />
      <RegisterRoomFooter
        preHref='/room/register/title'
        nextHref='/room/register/date'
      />
    </Container>
  )
}

export default RegisterRoomPrice
