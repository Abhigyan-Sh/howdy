const server  = async (req, res) => {
  const { method } = req

  if (method === 'GET') {
    try {
      res.status(200).send('success')
    } catch (err) {
      console.log(err)
    }
  }
}

export default server