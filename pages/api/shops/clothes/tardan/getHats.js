import firebase from '../../../../../lib/auth/firebase'

export default async (_, res) => {
  try {
    const snapshot = await firebase.firestore().collection('tardan').get()

    const data = []

    snapshot.forEach(doc => {
      const document = doc.data()
      document.id = doc.id
      data.push(document)
    })

    res.status(200).json({ hats: data })
  } catch(e) {
    console.log(e.message)
    res.status(400).send("Algo salio mal ;(")
  }
}