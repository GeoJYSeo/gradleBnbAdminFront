import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";
import palette from "../../../styles/palette";
import { BedType } from "../../../types/room";
import Button from "../../common/Button";
import Counter from "../../common/Counter";
import Selector from "../../common/Selector";

const Container = styled.li`
  width: 100%;
  padding: 28px 0;
  border-top: 1px solid ${palette.gray_dd};
  &:last-child {
    border-bottom: 1px solid ${palette.gray_dd};
  }

  .register-room-public-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-public-bed-type-bedroom-texts {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .register-room-public-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
    padding-bottom: 10px;
  }

  .register-room-public-bed-type-selector-wrapper {
    width: 320px;
  }

  .register-room-public-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }

  .register-room-public-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }

  .register-room-public-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }
`

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false)
  const publicBedList = useSelector((state) => state.registerRoom.public_bed_list)

  const dispatch = useDispatch()

  const totalBedsCount = useMemo(() => {
    let total = 0
    publicBedList.forEach((bed) => {
      total += bed.count
    })
    return total
  }, [publicBedList])

  const bedsText = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type} ${bed.count} Bed(s)`)
    return texts.join(",")
  }, [publicBedList])

  const initialBedOptions = () => publicBedList.map((bed) => bed.type)
  // 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions)

  // 남은 침대 옵션들
  const leftBedOptions = useMemo(() => {
    return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType))
  }, [activedBedOptions, publicBedList])

  return (
    <Container>
      <div className='register-room-public-bed-type-top'>
        <div className='register-room-public-bed-type-bedroom-texts'>
          <p className='register-room-public-bed-type-bedroom'>Public Spaces</p>
          <p className='register-room-public-bed-type-bedroom-counts'>
            {totalBedsCount} Bed(s)<br />
            {bedsText}
          </p>
        </div>
        <Button onClick={() => setOpened(!opened)}>
          {opened && 'Completed'}
          {!opened && (totalBedsCount === 0 ? 'Add Bed(s)' : 'Modify Bed(s)')}
        </Button>
      </div>
      {opened && (
        <div className='register-room-public-bed-type-selector-wrapper'>
          <div className='register-room-public-bed-type-counters'>
            {activedBedOptions.map((type) => (
              <div className='register-room-public-bed-type-counter' key={type}>
                <Counter
                  label={type}
                  value={publicBedList.find((bed) => bed.type === type)?.count || 0}
                  minValue={0}
                  key={type}
                  onChange={(value) => dispatch(registerRoomActions.setPublicBedTypeCount({ type, count: value }))}
                />
              </div>
            ))}
            <Selector
              type='register'
              options={leftBedOptions}
              disabledOptions={['Add a Bed']}
              value='Add a Bed'
              useValidation={false}
              onChange={(e) => setActivedBedOptions([ ...activedBedOptions, e.target.value as BedType])}
            />
          </div>
        </div>
      )}
    </Container>
  )
}

export default RegisterRoomPublicBedTypes
