import { Form, InputNumber, Button, Row, Col } from 'antd'

const UploadPhotoForm = ({ uploadPhoto }) => {
  const [form] = Form.useForm()

  return(
    <Form
      onFinish={values => {
        const { width, height } = values
        uploadPhoto(width, height)
        form.resetFields()
      }}
      form={form}
    >

      {/** Width */}
      <Form.Item
        label="Ancho"
        name="width"
        rules={[{
          required: true,
          message: "Agrega el ancho"
        },{
          type: "number",
          message: "Agrega un ancho valido"
        }]}
      >
        <InputNumber style={{ width: "100%" }}  />
      </Form.Item>

      {/** Height */}
      <Form.Item
        label="Altura"
        name="height"
        rules={[{
          required: true,
          message: "Agrega la altura"
        },{
          type: "number",
          message: "Agrega una altura valida"
        }]}
      >
        <InputNumber style={{ width: "100%" }}  />
      </Form.Item>

      {/** Submit button */}
      <Form.Item>
        <Row gutter={[12, 12]}>
          <Col>
            <Button type="primary" htmlType="submit">Agregar</Button>
          </Col>
          <Col>
            <Button type="default" onClick={() => {
              form.setFieldsValue({
                height: 1000,
                width: 1000
              })
              form.submit()
            }}>1000 x 1000</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default UploadPhotoForm