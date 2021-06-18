const request = require('supertest')
const users = require('./users/users-model')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

// describe('[GET] /', () => {
//   it('returns a status 200 OK', async () => {
//     const res = await request(server).get('/')
//     expect(res.status).toBe(200)
//     expect(res.body).toMatchObject({ api: 'up!' })
//     expect(res.body).toMatchSnapshot() // for large JSON
//   })
// })
// describe('[POST] /hobbit', () => {
//   it('returns a status 201 CREATED', async () => {
//     const res = await request(server).post('/hobbits').send({ name: 'bilbo' })
//     expect(res.status).toBe(201)
//   })
//   it('returns newly created hobbit', async () => {
//     const res = await request(server).post('/hobbits').send({ name: 'bilbo' })
//     // console.log(res)
//     expect(res.body).toMatchObject({ id: 5, name: 'bilbo' })
//   })
// })

