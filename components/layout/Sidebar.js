import { useUser } from '../../lib/auth/userContext'

import { useRouter } from 'next/router'
import { useState } from 'react'

import { Drawer, Menu } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

const Sidebar = ({sidebar, setSidebar}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { username } = useUser()

  const nav = rute => {
    setLoading(true)
    if(rute === router.pathname) {
      setLoading(false)
      setSidebar(!sidebar)
    } else {
      router.push(rute)
    }
  }

  return(
    <Drawer
      title={`Hola, ${username}`}
      visible={sidebar}
      closeable="true"
      placement="left"
      onClose={() => setSidebar(!sidebar)}
    >
      <Menu>
        <Menu.Item icon={<img src="/tablero.svg" className="icon" />} onClick={() => nav('/dashboard')}>
          Dashboard
        </Menu.Item>

        <Menu.ItemGroup title="Tiendas">
          <Menu.SubMenu title="Ropa" icon={<img src="/percha.svg" className="icon" />}>
            <Menu.Item onClick={() => nav('/tardan')}>
              Tardan
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.ItemGroup>  
      
      </Menu>

      {loading ? (
        <LoadingOutlined style={{ position: "fixed", bottom: "1rem", left: "1rem", fontSize: "2rem", color: "#722ED1" }}  />
      ) : null}
    </Drawer>
  )
}

export default Sidebar