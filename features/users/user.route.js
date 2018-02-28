const express = require('express');
const router = express.Router();
const verify = require('@common/verify');
const userCtrl = require('./user.ctrl.js');
const userValidator = require('./user.validator');

/**
     *
     * @api {get} /
     * @apiName listAll
     * @apiGroup User
     * @apiVersion  major.minor.patch
     *
     *
     * @apiParam  {String} paramName description
     *
     * @apiSuccess (200) {type} name description
     *
     * @apiParamExample  {type} Request-Example:
       {
           property : value
       }
     *
     *
     * @apiSuccessExample {type} Success-Response:
       {
           property : value
       }
     *
     *
     */
router.route(`/`)
  .get(verify.nocache, verify.user, verify.unseal, verify.admin, userCtrl.listAll);

/**
     *
     * @api {post} /register
     * @apiName register
     * @apiGroup User
     * @apiVersion  major.minor.patch
     *
     *
     * @apiParam  {String} paramName description
     *
     * @apiSuccess (200) {type} name description
     *
     * @apiParamExample  {type} Request-Example:
       {
           property : value
       }
     *
     *
     * @apiSuccessExample {type} Success-Response:
       {
           property : value
       }
     *
     *
     */
router.route(`/register`)
  .post(userValidator.register, userCtrl.register);

/**
      *
      * @api {post} /login
      * @apiName login
      * @apiGroup User
      * @apiVersion  major.minor.patch
      *
      *
      * @apiParam  {String} paramName description
      *
      * @apiSuccess (200) {type} name description
      *
      * @apiParamExample  {type} Request-Example:
        {
            property : value
        }
      *
      *
      * @apiSuccessExample {type} Success-Response:
        {
            property : value
        }
      *
      *
      */
router.route(`/login`)
  .post(userValidator.login, userCtrl.login);
/**
       *
       * @api {get} /logout
       * @apiName logout
       * @apiGroup User
       * @apiVersion  major.minor.patch
       *
       *
       * @apiParam  {String} paramName description
       *
       * @apiSuccess (200) {type} name description
       *
       * @apiParamExample  {type} Request-Example:
         {
             property : value
         }
       *
       *
       * @apiSuccessExample {type} Success-Response:
         {
             property : value
         }
       *
       *
       */
router.route(`/logout`)
  .get(userCtrl.logout);

/**
 *
 * @api {get} /me
 * @apiName verifyUser
 * @apiGroup User
 * @apiVersion  major.minor.patch
 *
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
   {
       property : value
   }
 *
 *
 * @apiSuccessExample {type} Success-Response:
   {
       property : value
   }
 *
 *
 */

router.route(`/me`)
  .get(verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);

module.exports = router;
