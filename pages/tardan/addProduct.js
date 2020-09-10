import Layout from '../../components/layout/Layout'
import UploadPhoto from '../../components/product/UploadPhoto'

import { useUser } from '../../lib/auth/userContext'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Spin, Button, Form, Input, Row, Col, Divider, InputNumber, Select, Card, notification, message} from 'antd'
import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons'
const { Option } = Select

const AddProduct = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const { loadingUser, user } = useUser()
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  
  const [productCare, setProductCare] = useState(true)
  
  if(loadingUser) return(
    <div className="center-center">
      <Spin spinning={true} />
    </div>
  )
  
  if(!user) return(
    <div>
      <img src="/incognito.svg" alt="Incognito" style={{ width: "200px" }} className="center-center" />
    </div>
  )
  
  const onFinish = values => {

    const proPhotos = photos.filter((photo) => {
      return photo.photos.length !== 0 && photo.color !== "color"
    })

    if(proPhotos.length === 0 || proPhotos[0] === "color" || proPhotos[0].photos.length === 0) {
      return openNotificationImages()
    }

    const {
      name,
      nickname,
      size,
      category,
      price,
      description,
      productCare,
      material
    } = values

    /** Delete the first element */
    const newSize = size.filter((_, i) => {
      return i !== 0
    })

    const newProduct = {
      name,
      nickname,
      size: newSize,
      category,
      price,
      description,
      productCare,
      material,
      photos: proPhotos
    }

    setLoading(true)

    fetch('/api/shops/clothes/tardan/addHat', {
      method: 'POST',
      headers: new Headers({ 'Content-type': 'application/json', token: user }),
      body: JSON.stringify(newProduct)
    }).then(res => {
      if (res.status === 200) {
        setLoading(false)
        message.success('Sombrero agregado correctamente')
        form.resetFields()
        setPhotos([])
      } else {
        setLoading(false)
        message.error('Algo salio mal, vuelve a intentarlo')
      }
    }).catch(error => {
        setLoading(false)
        message.error('Algo salio mal, vuelve a intentarlo')
    })

  }

  const openNotificationImages = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" onClick={() => notification.close(key)}>
        Okay!
      </Button>
    )

    notification.info({
      message: "!Oh no",
      description: "Parece que no has agregado imágenes del producto, o la información que proporcionaste tiene algunas inconsistencias, verifica la información antes de enviar el formulario",
      placement: "topLeft",
      btn,
      key
    })
  }

  return(
    <Layout title="Tardan - Agregar Sombrero">
      <Spin tip="Cargando..." spinning={loading} style={{ position: "fixed", right: "1rem", top: "75px" }} />
      <Spin spinning={loading} style={{ display: "none" }}>
      <div>

        {/** "Tardan" button */}
        <Button style={{ margin: "1rem" }} onClick={() => {
          router.push('/tardan')
        }}><ArrowLeftOutlined />Tardan</Button>

        {/** Title */}
        <div style={{ textAlign: "center" }}>
          {<h1>Agregar Sombrero <img src="/sombrero.svg"style={{ width: "2.5rem" }} /></h1>}
        </div>

        {/** Form */}
        <Form layout="vertical" style={{
          width: "90%",
          margin: "0 auto",
          textAlign: "right"
        }} form={form} onFinish={onFinish}>


          {/** General information */}
          <Divider orientation="left" plain style={{ width: "95%", color: "gray" }}>Información general</Divider>
          <Row gutter={[8, 8]} style={{ margin: "1rem" }}>

            {/** Name */}
            <Col xs={24} md={12}>
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{
                  required: true,
                  message: "Agrega un nombre"
                }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/** Nickname */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Sobrenombre"
                name="nickname"
                rules={[{
                  required: true,
                  message: "Agrega un sobrenombre"
                }]}
              >
                <Input />
              </Form.Item>
            </Col>

            {/** Sizes */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Tallas"
                name="size"
                rules={[{
                  required: true,
                  message: "Agrega las tallas del sombrero"
                }]}
              >
                <Select>
                  <Select.Option value={["53 a 60" ,53, 54, 55, 56, 57, 58, 59, 60]}>53 a 60</Select.Option>
                  <Select.Option value={["53 a 62" ,53, 54, 55, 56, 57, 58, 59, 60, 61, 62]}>53 a 62</Select.Option>
                  <Select.Option value={["54 a 60" ,54, 55, 56, 57, 58, 59, 60]}>54 a 60</Select.Option>
                  <Select.Option value={["54 a 62" ,54, 55, 56, 57, 58, 59, 60, 61, 62]}>54 a 62</Select.Option>
                  <Select.Option value={["55 a 60" ,55, 56, 57, 58, 59, 60]}>55 a 60</Select.Option>
                  <Select.Option value={["55 a 62" ,55, 56, 57, 58, 59, 60, 61, 62]}>55 a 62</Select.Option>

                  <Select.Option value={["XCH, CH, M, G" ,"XCH" ,"CH", "M", "G"]}>XCH, CH, M, G</Select.Option>
                  <Select.Option value={["CH, M, G" ,"CH", "M", "G"]}>CH, M, G</Select.Option>
                  <Select.Option value={["CH, M, G, XG" ,"CH", "M", "G", "XG"]}>CH, M, G, XG</Select.Option>

                  <Select.Option value="Unitalla">Unitalla</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/** Category */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Categoría"
                name="category"
                rules={[{
                  required: true,
                  message: "Agrega la categoría del sombrero"
                }]}
              >
                <Select onChange={value => {
                  if(value === "Boinas") {
                    return setProductCare(false)
                  } else {
                    setProductCare(true)
                  }
                }}>
                  <Option value="Etiqueta">Etiqueta</Option>
                  <Option value="Vestir">Vestir</Option>
                  <Option value="Casual">Casual</Option>
                  <Option value="Texanos">Texano</Option>
                  <Option value="Western">Western</Option>
                  <Option value="Playa">Playa</Option>
                  <Option value="Deportivos">Deportivo</Option>
                  <Option value="Boinas" onClick={() => setProductCare(false)}>Boina</Option>
                </Select>
              </Form.Item>
            </Col>

             {/** Price */}
             <Col xs={24} md={12}>
              <Form.Item
                label="Precio"
                name="price"
                rules={[{
                  required: true,
                  message: "Agrega el precio"
                },{
                  type: "number",
                  message: "Ingresa una cantidad valida"
                }]}
              >
                <InputNumber style={{ width: "100%" }}  />
              </Form.Item>
            </Col>
          </Row>

          {/** Product description and details */}
          <Divider orientation="left" plain style={{ width: "95%", color: "gray" }}>Descripción y detalles del producto</Divider>
          <Row gutter={[8, 8]} style={{ margin: "1rem" }}>

            {/** Description */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Descripción"
                name="description"
                rules={[{
                  required: true,
                  message: "Agrega una descripción"
                }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>

            {/** Product care */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Cuidado del producto"
                name="productCare"
                rules={[{
                  required: !productCare,
                  message: "Agrega el cuidado del producto"
                }]}
              >
                <Input.TextArea rows={4} disabled={productCare} />
              </Form.Item>
            </Col>

            {/** Material */}
            <Col xs={24} md={12}>
            <Form.Item
                label="Material"
                name="material"
                rules={[{
                  required: true,
                  message: "Agrega el material"
                }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/** Photos */}
          <Divider orientation="left" plain style={{ width: "95%", color: "gray" }}>Fotos del producto por color</Divider>
          <Row gutter={[8, 8]} style={{ margin: "1rem", textAlign: "right" }}>

            {photos.map((photo, i) => {
              return(
                <Col span={24} key={i}>
                  <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Input value={photo.color} onChange={e => {
                      let newPhotos = photos
                      newPhotos[i].color = e.target.value
                      setPhotos([...newPhotos])
                      /* console.log(photos) */
                    }} style={{ width: "90%" }} />

                    <CloseOutlined className="click" onClick={() => {
                      let newPhotos = photos.filter((_, index) => {
                        return index !== i
                      })
                      setPhotos([...newPhotos])
                    }} />
                  </div>}>
                    <div>
                      <UploadPhoto photos={photos} setPhotos={setPhotos} index={i} />
                    </div>
                  </Card>
                </Col>
              )
            })}

            <Button type="default" onClick={() => setPhotos([...photos, {color: "color", photos: []}])}>Agregar color</Button>
          </Row>

          <Form.Item style={{ margin: "1rem" }}>
            <Button type="primary" htmlType="submit">Agregar sombrero</Button>
          </Form.Item>

        </Form>
      </div>
      </Spin>
    </Layout>
  )
}


export default AddProduct