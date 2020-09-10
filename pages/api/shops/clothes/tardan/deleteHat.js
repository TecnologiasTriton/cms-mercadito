import admin from '../../../../../lib/auth/firebaseAdmin'

export default async (req, res) => {
  const token = req.headers.token
  const hat = req.body

  try {
    if(!token) return res.status(403).json({ message: ";(" })
  
    const userToken = await admin.auth().verifyIdToken(token)
    if(!userToken.admin) return res.status(403).json({ message: ";(" })

    await admin.firestore().collection('tardan').doc(hat).delete()
    res.status(200).json({ message: "OK!" })
  } catch(e) {
    console.log(e.message)
    res.status(500).json({ message: "Ha ocurrido un error, intentalo de nuevo!" })
  }
}