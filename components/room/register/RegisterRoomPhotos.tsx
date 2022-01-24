import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from '../../../store'
import palette from '../../../styles/palette'
import Button from '../../common/Button'
import UploadIcon from '../../../public/static/svg/register/upload.svg'
import { useDispatch } from 'react-redux'
import { getPhotoAPI, uploadPhotoAPI } from '../../../lib/api/photos'
import { registerRoomActions } from '../../../store/registerRoom'
import RegisterRoomPhotoCardList from './RegisterRoomPhotoCardList'
import RegisterRoomFooter from './RegisterRoomFooter'

const Container = styled.div`
  padding: 62px 30px 100px;

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

  .register-room-step-info {
    font-size: 14px;
    max-width: 800px;
    margin-bottom: 50px;
  }

  .register-room-upload-photos-wrapper {
    width: 858px;
    height: 433px;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray_bb};
    border-radius: 6px;
    
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
`

const RegisterRoomPhotos: React.FC = () => {
  const photos = useSelector((state) => state.registerRoom.photos)
  const email = useSelector((state) => state.user.email)

  const dispatch = useDispatch()

  // 이미지 업로드 하기
  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (files && files.length > 0) {
      const file = files[0]
      const formData = new FormData()
      formData.append('photo', file)
      formData.append('email', email)

      try {
        const { data } = await uploadPhotoAPI(formData)
        if (data.data) {
          dispatch(registerRoomActions.setPhotos([data.data]))
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    email && getPhotoAPI(email).then((res) => dispatch(registerRoomActions.setPhotos(res.data.data)))
      .catch((err) => console.log(err))
  }, [email])
  
  return (
    <Container>
      <h2>Upload the accommdation images.</h2>
      <h3>The seventh Step</h3>
      <p className='register-room-step-info'>
        Please upload a photo that allows guests to imagine the atmosphere of your accommodation.<br />
        Firstly, Please upload a photo and after registering the accommodation you can add more.
      </p>
      {isEmpty(photos) && (
        // 사진이 없을 때
        <div className='register-room-upload-photos-wrapper'>
          <input
            type='file'
            accept='image/*'
            onChange={uploadPhoto}
          />
          <Button
            icon={<UploadIcon />}
            color='bittersweet'
            width='200px'
          >
            Upload Photo
          </Button>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
      <RegisterRoomFooter
        preHref='/room/register/conveniences'
        nextHref='/room/register/description'
      />
    </Container>
  )
}

export default RegisterRoomPhotos
