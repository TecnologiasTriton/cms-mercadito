// import components
import Layout from '../components/layout/Layout'

// Import dependencies
import firebase from '../lib/auth/firebase'
import { useUser } from '../lib/auth/userContext'

import { Button, Spin } from 'antd'

const Dashboard = () => {
  const { loadingUser, user } = useUser()

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

  return(
    <Layout>
      <h1>Dashboard</h1>

      <Button type="primary" onClick={() => {
        firebase.auth().signOut()
      }}>Cerrar sesión</Button>
    </Layout>
  )
}

export default Dashboard