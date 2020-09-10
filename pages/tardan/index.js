import { useState, useEffect } from 'react'

import Layout from '../../components/layout/Layout'
import { useUser } from '../../lib/auth/userContext'

import { Button, Spin, Row, Col, Card, Select, Modal, Divider, Image, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
const { Option } = Select
import { useRouter } from 'next/router'
import Link from 'next/link'

import useSWR from 'swr'

const fetcher = url => fetch(url).then((res) => res.json())

const Tardan = () => {
  const router = useRouter()
  const { loadingUser, user } = useUser()
  const { data, error } = useSWR('/api/shops/clothes/tardan/getHats', fetcher)
  const [hats, setHats] = useState([])

  /** Modal properties - info */
  const [visibleModal, setVisibleModal] = useState(false)
  const [name, setName] = useState(null)
  const [category, setCategory] = useState(null)
  const [description, setDescription] = useState(null)
  const [material, setMaterial] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [photos, setPhotos] = useState([])
  const [price, setPrice] = useState(0)
  const [size, setSize] = useState(null)
  const [productCare, setProductCare] = useState(null)

  /** Modal properties - delete */
  const [deleteModal, setDeleteModal] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [id, setId] = useState(null)

  /** Pass data.hats to hats state */
  useEffect(() => {
    if(data) return setHats(data.hats)
  }, [data])

  if(loadingUser || !data) return(
    <div className="center-center">
      <Spin spinning={true} />
    </div>
  )

  if(!user) return(
    <div>
      <img src="/incognito.svg" alt="Incognito" style={{ width: "200px" }} className="center-center" />
    </div>
  )

  if(error) return(
    <div>
      <img src="/error.svg" alt="Error" style={{ width: "200px" }} className="center-center" />
    </div>
  )

  if(hats) return(
    <Layout title="Tardan">
      <div style={{
        textAlign: "center"
      }}>

        {/** Logo tardan */}
        <div>
          <img src="/images/logo-tardan.png" style={{ margin: "1.5rem" }} />
        </div>

        {/** Add Product - Filter By Category */}
        <Row gutter={[8, 8]} style={{ margin: "1rem" }}>
          <Col>
            <div>
              <Button type="primary" onClick={() => {
                router.push('/tardan/addProduct')
              }}>Agregar sombrero</Button>
            </div>
          </Col>
          <Col>
            <div>
              <Select
                defaultValue="todos"
                onChange={value => {
                  if(value !== "todos") {
                    const newHats = data.hats.filter((hat) => {
                      return hat.category === value
                    })
                    setHats([...newHats])
                  } else {
                    setHats([...data.hats])
                  }
                }}
                className="select-filter-by-category"
              >
                <Option value="todos">Todos</Option>
                <Option value="Etiqueta">Etiqueta</Option>
                <Option value="Vestir">Vestir</Option>
                <Option value="Casual">Casual</Option>
                <Option value="Texanos">Texano</Option>
                <Option value="Western">Western</Option>
                <Option value="Playa">Playa</Option>
                <Option value="Deportivos">Deportivo</Option>
                <Option value="Cachuchas" onClick={() => setProductCare(false)}>Boina</Option>
              </Select>
            </div>
          </Col>
        </Row>

        {/** Products */}
        <Row gutter={[8, 8]} style={{ margin: "1rem" }}>
          {hats.map((hat, i) => {
            return(
              <Col key={i} xs={12} sm={8} md={8} xl={6}>
                <Card
                  style={{ padding: "0.5rem" }}
                  cover={
                    <img alt={hat.name} src={hat.photos[0].photos[0].url} onClick={() => {
                      setName(hat.name)
                      setNickname(hat.nickname)
                      setDescription(hat.description)
                      setMaterial(hat.material)
                      setCategory(hat.category)
                      setPrice(hat.price)
                      setSize(hat.size)
                      setProductCare(hat.productCare)
                      setPhotos(hat.photos)
                      setVisibleModal(true)
                    }} className="click" />
                  }
                  actions={[
                    <Link href="/tardan/edit/[id]" as={`/tardan/edit/${hat.id}`}>
                      <a>
                        <EditOutlined/>
                      </a>
                    </Link>,
                    <DeleteOutlined onClick={() => {
                      setName(hat.name)
                      setId(hat.id)
                      setDeleteModal(true)
                    }} />,
                  ]}
                >
                  <Card.Meta
                  title={hat.name} description={hat.nickname} />
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>

      {/** Modal */}
      <Modal
        title={name}
        visible={visibleModal}
        onCancel={() => setVisibleModal(false)}
        footer={null}
      >
        <p><strong>Sobrenombre: </strong>{`${nickname}`}</p>
        <p><strong>Categoría: </strong>{`${category}`}</p>
        <p><strong>Material: </strong>{`${material}`}</p>
        <p><strong>Precio: </strong>{`$${price}.00`}</p>
        <p><strong>Cuidado del producto: </strong>{`${productCare || "Alter"}`}</p>
        <p><strong>Tallas: </strong>{`${size}`}</p>
        <p><strong>Descripción: </strong>{`${description}`}</p>
        <Divider plain orientation="left" style={{ color: "grey" }}>Fotos por color</Divider>
        {photos.map((color, index) => {
          return(
            <div key={index}>
              <p><strong>{color.color}</strong></p>
              {color.photos.map((img ,i) => {
                return(
                  <Image key={i} src={img.url} alt={img.name} width={100} className="click" />
                )
              })}
            </div>
          )
        })}
      </Modal>

      <Modal
        visible={deleteModal}
        onCancel={() => setDeleteModal(false)}
        footer={null}
      >
        <div>
          <Spin spinning={loadingDelete}>
          <p>Estas seguro que deseas eliminar este articulo: <br />
          <strong>{name}</strong><br />de la base de datos?</p>
          <div style={{ textAlign: "right" }}>
            <Button style={{marginRight: "1rem" }} onClick={() => setDeleteModal(false)}>Cancelar</Button>
            <Button type="primary" danger onClick={() => {
              setLoadingDelete(true)
              fetch('/api/shops/clothes/tardan/deleteHat', {
                method: 'POST',
                headers: new Headers({ 'Content-type': 'application/json', token: user }),
                body: JSON.stringify(id)
              }).then(async res => {
                const messageFetched = await res.json()
                if(res.status === 200) {
                  let newHats = hats.filter((hat) => {
                    return hat.id !== id
                  })
                  setHats([...newHats])
                  message.success("Articulo eliminado correctamente")
                } else {
                  message.error(messageFetched.message)
                }
                setLoadingDelete(false)
                setDeleteModal(false)
              })
            }}>Eliminar</Button>
          </div>
          </Spin>
        </div>
      </Modal>
    </Layout>
  )
}


export default Tardan