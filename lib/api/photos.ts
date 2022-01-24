import axios from ".";

interface PhotoAPIParams {
  id: number
  email: string
}

export const getPhotoAPI = (email: string) => axios.get('api/photo', { params: { email } })

export const uploadPhotoAPI = (formData: FormData) => axios.post('/api/photo', formData)

export const deletePhotoAPI = (params: PhotoAPIParams) => axios.delete('api/photo', { params: params })

export const updatePhotoAPI = (formData: FormData) => axios.put('/api/photo', formData)
