import axios from 'axios';

const API = axios.create({
  baseURL: 'https://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/',
  timeout: 3000
})

export const fetchPhotoFeedData = (page, onSuccess, onError) => {
  return API.get(`cards/page_${page}.json`)
    .then(response => onSuccess(response.data))
    .catch(error => {
      return error.response ? onError(error.response) : onError()
    })
}
