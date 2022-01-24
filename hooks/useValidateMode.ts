import { useDispatch } from "react-redux"
import { useSelector } from "../store";
import { commonActions } from "../store/common";

const validateMode = () => {
  const dispath = useDispatch();
  const validateMode = useSelector((state) => state.common.validateMode)

  const setValidateMode = (value: boolean) => dispath(commonActions.setValidateMode(value))

  return { validateMode, setValidateMode }
}

export default validateMode
