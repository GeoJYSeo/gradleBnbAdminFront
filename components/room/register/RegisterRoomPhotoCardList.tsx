import React, { useEffect } from 'react'
import styled from 'styled-components'
import PencilIcon from '../../../public/static/svg/register/photo/pencil.svg'
import TrashCanIcon from '../../../public/static/svg/register/photo/trash_can.svg'
import GrayPlusIcon from '../../../public/static/svg/register/photo/gray_plus.svg'
import palette from '../../../styles/palette'
import { useDispatch } from 'react-redux'
import { deletePhotoAPI, updatePhotoAPI, uploadPhotoAPI } from '../../../lib/api/photos'
import { registerRoomActions } from '../../../store/registerRoom'
import { useSelector } from '../../../store'

const Container = styled.ul`
  width: 858px;
  margin: auto;

  // 첫번째 사진
  .register-room-first-photo-wrapper {
    width: 858px;
    height: 433px;
    margin: 0 auto 24px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    overflow: hidden;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    img {
      width: 100%;
      max-height: 100%;
    }
  }

  // 수정, 삭제 버튼
  .register-room-photo-interaction-buttons {
    display: none;
    position: absolute;
    top: 8px;
    right: 8px;

    button {
      width: 48px;
      height: 48px;
      background-color: white;
      border-radius: 50%;
      cursor: pointer;
      border: 0;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
      &:first-child {
        margin-right: 8px;
      }
    }
  }

  li:nth-child(3n + 1) {
    margin-right: 0;
  }

  .register-room-photo-card {
    position: relative;
    display: inline-block;
    width: calc((100% - 48px) / 3);
    height: 180px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    &:hover {
      .register-room-photo-interaction-buttons {
        display: flex;
      }
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  // 사진 추가하기 카드
  .register-room-add-more-photo-card {
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    margin-right: 24px;
    margin-bottom: 24px;
    display: flex;

    svg {
      margin-bottom: 12px;
    }
  }
`

interface IProps {
  photos: { id: number; url: string }[]
}

const RegisterRoomPhotoCardList: React.FC<IProps> = ({ photos }) => {
  const email = useSelector((state) => state.user.email)

  const dispatch = useDispatch()

  const makeInputElement = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept='image/*'
    return input
  }
  
  // 사진 추가하기
  // add a photo
  const addPhoto = () => {
    const inputEl = makeInputElement()
    inputEl.onchange = async (event) => {
      const { files } = event.target as HTMLInputElement
      if (files && files.length > 0) {
        const file = files[0]
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('email', email)

        try {
          const { data } = await uploadPhotoAPI(formData)
          if (data.data) {
            dispatch(registerRoomActions.setPhotos([...photos, data.data]))
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

    inputEl.click()
  }

  // 사진 수정하기
  // update a Photo
  const updatePhoto = async (id: number, index: number) => {
    const inputEl = makeInputElement()
    inputEl.onchange = async (event) => {
      const { files } = event.target as HTMLInputElement
      if (files && files.length > 0) {
        const file = files[0]
        const formData = new FormData()
        formData.append('photo', file)
        formData.append('email', email)
        formData.append('id', String(id))

        try {
          const { data } = await updatePhotoAPI(formData)
          if (data.data) {
            const newPhotos = [...photos]
            newPhotos[index] = data.data
            dispatch(registerRoomActions.setPhotos(newPhotos))
          }
        } catch (e) {
          console.log(e)
        }
      }
    }

    inputEl.click()
  }

  // 사진 삭제하기
  // delete a photo
  const deletePhoto = async (id: number) => {
    try {
      await deletePhotoAPI({ id, email })
      const newPhotos = photos.filter(((photo) => photo.id !== id))
      dispatch(registerRoomActions.setPhotos(newPhotos))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      {photos.map((photo, index) => (
        <React.Fragment key={index}>
          {index === 0 && (
            <li className='register-room-first-photo-wrapper'>
              <img src={photo.url} alt='' />
              <div className='register-room-photo-interaction-buttons'>
                <button
                  type='button'
                  onClick={() => deletePhoto(photo.id)}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type='button'
                  onClick={() => updatePhoto(photo.id, index)}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
          {index !== 0 && (
            <li className='register-room-photo-card'>
              <img src={photo.url} alt='' />
              <div className='register-room-photo-interaction-buttons'>
                <button
                  type='button'
                  onClick={() => deletePhoto(photo.id)}
                >
                  <TrashCanIcon />
                </button>
                <button
                  type='button'
                  onClick={() => updatePhoto(photo.id, index)}
                >
                  <PencilIcon />
                </button>
              </div>
            </li>
          )}
        </React.Fragment>
      ))}
      <li
        className='register-room-photo-card'
        role='presentation'
        onClick={addPhoto}
      >
        <div className='register-room-add-more-photo-card'>
          <GrayPlusIcon />
        </div>
      </li>
    </Container>
  )
}

export default RegisterRoomPhotoCardList
