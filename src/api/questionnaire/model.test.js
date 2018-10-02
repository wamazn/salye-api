import { Questionnaire } from '.'
import { User } from '../user'

let user, questionnaire

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  questionnaire = await Questionnaire.create({ creator: user, name: 'test', picture: 'test', maxAttempt: 'test', status: 'test', type: 'test', isPublic: 'test', requireId: 'test', version: 'test', deadline: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = questionnaire.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(questionnaire.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(questionnaire.name)
    expect(view.picture).toBe(questionnaire.picture)
    expect(view.maxAttempt).toBe(questionnaire.maxAttempt)
    expect(view.status).toBe(questionnaire.status)
    expect(view.type).toBe(questionnaire.type)
    expect(view.isPublic).toBe(questionnaire.isPublic)
    expect(view.requireId).toBe(questionnaire.requireId)
    expect(view.version).toBe(questionnaire.version)
    expect(view.deadline).toBe(questionnaire.deadline)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = questionnaire.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(questionnaire.id)
    expect(typeof view.creator).toBe('object')
    expect(view.creator.id).toBe(user.id)
    expect(view.name).toBe(questionnaire.name)
    expect(view.picture).toBe(questionnaire.picture)
    expect(view.maxAttempt).toBe(questionnaire.maxAttempt)
    expect(view.status).toBe(questionnaire.status)
    expect(view.type).toBe(questionnaire.type)
    expect(view.isPublic).toBe(questionnaire.isPublic)
    expect(view.requireId).toBe(questionnaire.requireId)
    expect(view.version).toBe(questionnaire.version)
    expect(view.deadline).toBe(questionnaire.deadline)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
