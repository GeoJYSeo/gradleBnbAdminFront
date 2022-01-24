import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../../lib/staticData";
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

  .register-room-bedroom {
    width: 100%auto;
    padding: 28px 0;
    border-top: 1px solid ${palette.gray_dd};
    &:last-child {
      border-bottom: 1px solid ${palette.gray_dd};
    }
  }
  
  .register-room-bed-type-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-room-bed-type-bedroom-texts {
    margin-bottom: 28px;
  }

  .register-room-bed-type-bedroom {
    font-size: 19px;
    color: ${palette.gray_48};
  }

  .register-room-bed-type-selector-wrapper {
    width: 320px;
  }

  .register-room-bed-type-counters {
    width: 320px;
    margin-top: 28px;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 18px;
  }

  .register-room-bed-type-bedroom-counts {
    font-size: 19px;
    color: ${palette.gray_76};
  }
`

interface IProps {
  bedroom: { id: number; beds: { type: BedType; count: number }[] };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
  const [opened, setOpened] = useState(false)

  // 페이지 이동 후 돌아와도 state 에 값이 남아 있음
  const initialBedOptions = bedroom.beds.map((bed) => bed.type)

  // 선택된 침대 옵션들
  const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(initialBedOptions)

  const dispatch = useDispatch()

  // 남은 침대 옵션들
  const leftBedOptions = useMemo(() => {
    return bedTypes.filter((bedTypes) => !activedBedOptions.includes(bedTypes))
  }, [activedBedOptions, bedroom])

  // 침대 개수 총합
  const totalBedCount = useMemo(() => {
    let total = 0
    bedroom.beds.forEach((bed) => {
      total += bed.count
    })
    return total
  }, [bedroom])

  // 침대 종류 텍스트
  const bedsText = useMemo(() => {
    const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count} bed(s)`)
    return texts.join(',')
  }, [bedroom])

  // 침실 유형 열고 닫기
  const toggleOpened = () => setOpened(!opened)

  // 침실 침대 개수 변경 시
  const onChangeBedTypeCount = (value: number, type: BedType) =>
    dispatch(registerRoomActions.setBedTypeCount({
      bedroomId: bedroom.id,
      type,
      count: value
    }))

  return (
    <Container>
      <div className='register-room-bed-type-top'>
        <div className='register-room-bed-type-bedroom-texts'>
          <p className='register-room-bed-type-bedroom'>Room Number{bedroom.id}</p>
          <p className='register-room-bed-type-bedroom-counts'>
            {totalBedCount} Bed(s)<br />
            {bedsText}
          </p>
        </div>
        <Button onClick={toggleOpened}>
          {opened && 'Completed'}
          {!opened && (totalBedCount === 0 ? 'Add Bed(s)' : 'Modify Bed(s)')}
        </Button>
      </div>
      {opened && (
        <div className='register-room-bed-type-selector-wrapper'>
          <div className='register-room-bed-type-counters'>
            {activedBedOptions.map((type) => (
              <div className='register-room-bed-type-counter' key={type}>
                <Counter
                  label={type}
                  value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                  minValue={0}
                  key={type}
                  onChange={(value) => onChangeBedTypeCount(value, type)}
                />
              </div>
            ))}
          </div>
          <Selector
            type='register'
            options={leftBedOptions}
            // defaultValue='Add Bed(s)'
            value='Add a Bed'
            disabledOptions={['Add a Bed']}
            useValidation={false}
            onChange={(e) => setActivedBedOptions([ ...activedBedOptions, e.target.value as BedType])}
          />
        </div>
      )}
    </Container>
  )
}

export default RegisterRoomBedTypes
