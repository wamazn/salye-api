import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Questionnaire, { schema } from './model'

const router = new Router()
const { name, picture, maxAttempt, status, type, isPublic, requireId, version, deadline } = schema.tree

/**
 * @api {post} /questionnaires Create questionnaire
 * @apiName CreateQuestionnaire
 * @apiGroup Questionnaire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Questionnaire's name.
 * @apiParam picture Questionnaire's picture.
 * @apiParam maxAttempt Questionnaire's maxAttempt.
 * @apiParam status Questionnaire's status.
 * @apiParam type Questionnaire's type.
 * @apiParam isPublic Questionnaire's isPublic.
 * @apiParam requireId Questionnaire's requireId.
 * @apiParam version Questionnaire's version.
 * @apiParam deadline Questionnaire's deadline.
 * @apiSuccess {Object} questionnaire Questionnaire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Questionnaire not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, picture, maxAttempt, status, type, isPublic, requireId, version, deadline }),
  create)

/**
 * @api {get} /questionnaires Retrieve questionnaires
 * @apiName RetrieveQuestionnaires
 * @apiGroup Questionnaire
 * @apiUse listParams
 * @apiSuccess {Object[]} questionnaires List of questionnaires.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /questionnaires/:id Retrieve questionnaire
 * @apiName RetrieveQuestionnaire
 * @apiGroup Questionnaire
 * @apiSuccess {Object} questionnaire Questionnaire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Questionnaire not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /questionnaires/:id Update questionnaire
 * @apiName UpdateQuestionnaire
 * @apiGroup Questionnaire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Questionnaire's name.
 * @apiParam picture Questionnaire's picture.
 * @apiParam maxAttempt Questionnaire's maxAttempt.
 * @apiParam status Questionnaire's status.
 * @apiParam type Questionnaire's type.
 * @apiParam isPublic Questionnaire's isPublic.
 * @apiParam requireId Questionnaire's requireId.
 * @apiParam version Questionnaire's version.
 * @apiParam deadline Questionnaire's deadline.
 * @apiSuccess {Object} questionnaire Questionnaire's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Questionnaire not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, picture, maxAttempt, status, type, isPublic, requireId, version, deadline }),
  update)

/**
 * @api {delete} /questionnaires/:id Delete questionnaire
 * @apiName DeleteQuestionnaire
 * @apiGroup Questionnaire
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Questionnaire not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
