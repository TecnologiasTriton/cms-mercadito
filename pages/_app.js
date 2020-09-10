import 'antd/dist/antd.css'
import '../styles/style.css'

import UserProvider from '../lib/auth/userContext'

const App = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App

/**
 * 
 *    - Solucionar el error de respuestas estancadas el iniciar sesioón
 *    - Implementar next-seo y react-helmet (revisar ejemplos de la documentacion de next y la documentacion de cada dependencia)
 *    - Inspeccionar el codigo html en 
 *    - Solucionar error de validacion en "Product care" al agregar un sombrero, cambiar a boina y regresar a sombrero (Posible solucion con un onBlur)
 * 
 */