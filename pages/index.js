// Import components
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import firebase from '../lib/auth/firebase'
import { useUser } from '../lib/auth/userContext'

// Imports from antd
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
 
const Index = () => {
  const { user } = useUser()
  const router = useRouter()

  const onFinish = values => {
    const { email, password } = values

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      user.user.getIdToken()
      .then(token => {
        fetch('/api/login', {
          method: 'POST',
          headers: new Headers({ 'Content-type': 'application/json', token }),
          credentials: 'same-origin'
        })
        .then(res => {
          if(res.status === 200) {
            router.push('/dashboard')
          } else {
            firebase.auth().signOut()
          }
        })
      })
    })
  }

  useEffect(() => {
    if(user) router.push('/dashboard')
  }, [user])

  return(
    <div>
      <div className="center-center" style={{ width: "300px", textAlign: "center" }}>
        {/** Company logo*/}
        <h1>Mercadito Qro</h1>

        {/** Login Form*/}
        <div>
          <Form onFinish={onFinish}>
            {/** Email */}
            <Form.Item name="email">
              <Input placeholder="Correo electrónico" prefix={<UserOutlined />} />
            </Form.Item>

            {/** Password */}
            <Form.Item name="password">
              <Input.Password placeholder="Contraseña" prefix={<LockOutlined />} type="password" />
            </Form.Item>

            {/** Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "80%" }}>Enviar</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Index