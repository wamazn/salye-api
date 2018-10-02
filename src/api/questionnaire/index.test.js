import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Questionnaire } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, questionnaire

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  questionnaire = await Questionnaire.create({ creator: user })
})

test('POST /questionnaires 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', maxAttempt: 'test', status: 'test', type: 'test', isPublic: 'test', requireId: 'test', version: 'test', deadline: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.maxAttempt).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.isPublic).toEqual('test')
  expect(body.requireId).toEqual('test')
  expect(body.version).toEqual('test')
  expect(body.deadline).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('POST /questionnaires 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /questionnaires 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /questionnaires/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${questionnaire.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(questionnaire.id)
})

test('GET /questionnaires/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /questionnaires/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${questionnaire.id}`)
    .send({ access_token: userSession, name: 'test', picture: 'test', maxAttempt: 'test', status: 'test', type: 'test', isPublic: 'test', requireId: 'test', version: 'test', deadline: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(questionnaire.id)
  expect(body.name).toEqual('test')
  expect(body.picture).toEqual('test')
  expect(body.maxAttempt).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.isPublic).toEqual('test')
  expect(body.requireId).toEqual('test')
  expect(body.version).toEqual('test')
  expect(body.deadline).toEqual('test')
  expect(typeof body.creator).toEqual('object')
})

test('PUT /questionnaires/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${questionnaire.id}`)
    .send({ access_token: anotherSession, name: 'test', picture: 'test', maxAttempt: 'test', status: 'test', type: 'test', isPublic: 'test', requireId: 'test', version: 'test', deadline: 'test' })
  expect(status).toBe(401)
})

test('PUT /questionnaires/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${questionnaire.id}`)
  expect(status).toBe(401)
})

test('PUT /questionnaires/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', picture: 'test', maxAttempt: 'test', status: 'test', type: 'test', isPublic: 'test', requireId: 'test', version: 'test', deadline: 'test' })
  expect(status).toBe(404)
})

test('DELETE /questionnaires/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${questionnaire.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /questionnaires/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${questionnaire.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /questionnaires/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${questionnaire.id}`)
  expect(status).toBe(401)
})

test('DELETE /questionnaires/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
