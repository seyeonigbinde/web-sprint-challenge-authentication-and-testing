const request = require('supertest')
const Users = require('./users/users-model')
const Jokes = require('./jokes/jokes-router')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {

})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})


  describe('getAll', () => {
    test('returns all jokes in db', async () => {
      const data = await Jokes.getAll()
      expect(data).toHaveLength(3)
    })
    test('returns the correct jokes with all their props', async () => {
      const data = await Jokes.getAll()
      expect(data).toMatchObject([
        {
          id: "0189hNRf2g",
          joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
        },
        {
          id: "08EQZ8EQukb",
          joke: "Did you hear about the guy whose whole left side was cut off? He's all right now."
        },
        {
          id: "08xHQCdx5Ed",
          joke: "Why didn’t the skeleton cross the road? Because he had no guts."
        }
      ])
    })
  })
// describe('[GET] /', () => {
//   it('returns a status 200 OK', async () => {
//     const res = await request(jokes).getAll('/')
//     expect(res.status).toBe(200)
//     expect(res.body).toMatchObject({
//       id: "0189hNRf2g",
//       joke: "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
//     },
//     {
//       id: "08EQZ8EQukb",
//       joke: "Did you hear about the guy whose whole left side was cut off? He's all right now."
//     },
//     {
//       id: "08xHQCdx5Ed",
//       joke: "Why didn’t the skeleton cross the road? Because he had no guts."
//     })

//   })
// })
// describe('[POST] /register', () => {
//   it('returns a status 201 CREATED', async () => {
//     const res = await request(users).insert('/register').send({
//       username: "Captain Marvel", 
//       password: "foobar"          
//     }
// )
//     expect(res.status).toBe(201)
//   })
//   it('returns newly created hobbit', async () => {
//     const res = await request(users).insert('/register').send({
//       username: "Captain Marvel", 
//       password: "foobar"          
//     })
//     // console.log(res)
//     expect(res.body).toMatchObject({ id: 1,  username: "Captain Marvel", 
//     })
//   })
// })