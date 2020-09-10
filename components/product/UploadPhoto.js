import UploadPhotoForm from './UploadPhotoForm'

import { useState } from 'react'
import { Upload, Modal, Progress } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import firebase from '../../lib/auth/firebase'

const UploadPhoto = ({ photos, setPhotos, index }) => {
    /** Photo states */
  const [visibleModalImage, setVisibleModalImage] = useState(false)
  const [file, setFile] = useState(null)
  const [uploadImageValue, setUploadImageValue] = useState(0)
  const [imageLoading, setImageLoading] = useState(false)

  /** Photo state for preview */
  const [titleImage, setTitleImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [widthImage, setWidthImage] = useState(0)
  const [heightImage, setHeightImage] = useState(0)
  const [modalPreviewImage, setModalPreviewImage] = useState(false) 

  const handleChangeImage = ({ file }) => {
    /* console.log(file) */
    setFile(file)
    if(file.status !== "removed") return setVisibleModalImage(true)
  }

  const uploadPhoto = (width, height) => {
    if(file.status !== "removed") {
      setVisibleModalImage(false)
      setUploadImageValue(0)
      setImageLoading(true)
      const storageRef = firebase.storage().ref(`/tardan/${file.name}`)
      const task = storageRef.put(file.originFileObj)
  
      task.on('state_changed', function(snapshot) {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadImageValue(percentage)
      }, error => {
        console.log(error.message)
      },function() {
        setUploadImageValue(100)
        setImageLoading(false)
        let newPhotos = photos
        let uid = (newPhotos[index].photos.length - (newPhotos[index].photos.length*2)) - 1
        newPhotos[index].photos.push({
          uid: `${uid}`,
          name: file.name,
          status: 'done',
          url: `https://firebasestorage.googleapis.com/v0/b/mercadito-qro.appspot.com/o/tardan%2F${file.name}?alt=media`,
          width,
          height
        })
        setPhotos([...newPhotos])
      })
    }
  }

  const handlePreviewImage = file => {
    setTitleImage(file.name)
    setImageUrl(file.url)
    setWidthImage(file.width)
    setHeightImage(file.height)
    setModalPreviewImage(true)
  }

  const onRemove = file => {
    let newPhotos = photos[index].photos.filter((photos) => {
      return photos.uid !== file.uid
    })
    let newFullPhotos = photos
    newFullPhotos[index].photos = newPhotos
    setPhotos([...newFullPhotos])
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return(
    <div>
      <Upload
        listType="picture-card"
        fileList={photos[index].photos}
        onPreview={handlePreviewImage}
        onChange={handleChangeImage}
        onRemove={onRemove}
      >
        {imageLoading ? <Progress type="circle" percent={uploadImageValue} width={80} /> : uploadButton}
      </Upload>

      <Modal
        visible={visibleModalImage}
        title="Agrega el ancho y la altura de la imagen"
        footer={null}
        onCancel={() => setVisibleModalImage(false)}
      >
        <UploadPhotoForm uploadPhoto={uploadPhoto} />
      </Modal>

      <Modal
        visible={modalPreviewImage}
        footer={null}
        onCancel={() => setModalPreviewImage(false)}
        title={titleImage}
      >
        <img alt={titleImage} style={{ width: '100%' }} src={imageUrl} />

        <div style={{ marginTop: "1rem" }}>
          <p>Ancho: {widthImage}</p>
          <p>Altura: {heightImage}</p>
        </div>
      </Modal>
    </div>
  )
}

export default UploadPhoto