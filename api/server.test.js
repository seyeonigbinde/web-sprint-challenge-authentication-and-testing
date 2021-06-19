const request = require('supertest')
const server = require('./server')
const Jokes = require('./jokes/jokes-data')
const db = require('../data/dbConfig')
const bcrypt = require('bcryptjs')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
 
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})
describe('[POST] /api/auth/login', () => {
  it(' responds with the correct message on valid credentials', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: 'Capt', password: 'foobar' })
    expect(res.body.message).toMatch(/welcome Capt  /i)
  }, 500)
  it(' responds with the correct status and message on invalid credentials', async () => {
    let res = await request(server).post('/api/auth/login').send({ username: 'cps', password: 'ff1234' })
    expect(res.body.message).toMatch(/invalid credentials/i)
    expect(res.status).toBe(401)
    res = await request(server).post('/api/auth/login').send({ username: 'marv', password: '1ffff2345' })
    expect(res.body.message).toMatch(/invalid credentials/i)
    expect(res.status).toBe(401)
  }, 500)
})

describe('[POST] /register', () => {
  it(' saves the user with a bcrypted password instead of plain text', async () => {
    await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar' })
    const signup = await db('users').where('username', 'Captain Marvel').first()
    expect(bcrypt.compareSync('foobar', signup.password)).toBeTruthy()
  }, 500)

  it(' responds with proper status on success', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: 'Captain Marvel', password: 'foobar' })
    expect(res.status).toBe(201)
  }, 500)

})

describe('getAll Jokes', () => {
  it(' requests without a token are bounced with proper status and message', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body.message).toMatch(/token required/i)
  })
  it(' requests with a valid token obtain a list of users', async () => {
    let res = await request(server).post('/api/auth/login').send({ username: 'Capt', password: 'foobar' })
    res = await request(server).get('/api/users').set('Authorization', res.body.token)
    expect(res.body).toMatchObject([{
      "id": "0189hNRf2g",
      "joke": "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
    },
    {
      "id": "08EQZ8EQukb",
      "joke": "Did you hear about the guy whose whole left side was cut off? He's all right now."
    },
    {
      "id": "08xHQCdx5Ed",
      "joke": "Why didn’t the skeleton cross the road? Because he had no guts."
    }])
  })
})