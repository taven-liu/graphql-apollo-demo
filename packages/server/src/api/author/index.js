export const listAuthors = async function(req, res) {
  // const r = await HistoryTask.forge(req.params).fetch()
  // if (!r) {
  //   res.status(404).json({ error: true, data: r })
  // }
  res.send({
    error: false,
    data: [
      {
        name: '12'
      }
    ]
  })
}
