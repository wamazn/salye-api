import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Questionnaire } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Questionnaire.create({ ...body, creator: user })
    .then((questionnaire) => questionnaire.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Questionnaire.find({ ...query, limit: 20, isDeleted: false}, select, cursor)
    .populate('creator')
    .then((questionnaires) => questionnaires.map((questionnaire) => questionnaire.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Questionnaire.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then((questionnaire) => questionnaire ? questionnaire.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Questionnaire.findById(params.id)
    .populate('creator')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((questionnaire) => questionnaire ? Object.assign(questionnaire, body).save() : null)
    .then((questionnaire) => questionnaire ? questionnaire.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Questionnaire.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'creator'))
    .then((questionnaire) => questionnaire ? questionnaire.softDelete() : null)
    .then(success(res, 204))
    .catch(next)
