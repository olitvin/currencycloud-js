/**
 * @module transfers
 */

'use strict';

var client = require('../client');

module.exports = {
  /**
   * Creates a new transfer.
   * @param {Object} params                       Object, which contains parameters of the transfer
   * @param {String} params.sourceAccountId       Paying account UUID.
   * @param {String} params.destinationAccountId  Receiving account UUID.
   * @param {String} params.currency              Currency in which the payment is being made, this must be 3 characters long. Currency codes are ISO 4217 standard.
   * @param {Number} params.amount                The amount to be paid ranging from 0-4 decimal places depending on the currency ISO 4217 standard.
   * @return {Promise}                            Promise; if fulfilled returns object, which contains created transfer; if rejected returns APIerror.
   */
  create: function (params) {
    params = params || {};
    if (!params.hasOwnProperty('sourceAccountId')) {
      throw new Error('sourceAccountId is required');
    }
    if (!params.hasOwnProperty('destinationAccountId')) {
      throw new Error('destinationAccountId is required');
    }
    if (!params.hasOwnProperty('currency')) {
      throw new Error('currency is required');
    }
    if (!params.hasOwnProperty('amount')) {
      throw new Error('amount is required');
    }

    var url = '/v2/transfers/create';

    var promise = client.request({
      url: url,
      method: 'POST',
      qs: params
    });

    return promise;
  },

  /**
   * Gets details of a transfer.
   * @param {Object} params    Parameters object
   * @param {String} params.id Id of the requested transfer, required
   * @return {Promise}         Promise; if fulfilled returns object, which contains requested transfer; if rejected returns APIerror.
   */
  get: function (params) {
    params = params || {};
    if (!params.hasOwnProperty('id')) {
      throw new Error('id is required');
    }

    var url = '/v2/transfers/' + params.id;

    var qs = Object.assign({}, params);
    delete qs.id;

    var promise = client.request({
      url: url,
      method: 'GET',
      qs: qs
    });

    return promise;
  },

  /**
   * Finds transfers matching the search criteria for the active user.
   * @param {Object} params Object, which contains parameters of the sought transfers
   * @return {Promise}      Promise; if fulfilled returns object, which contains array of found transfers, as well as pagination information; if rejected returns APIerror.
   */
  find: function (params) {
    var url = '/v2/transfers/find';

    var promise = client.request({
      url: url,
      method: 'GET',
      qs: params
    });

    return promise;
  }
};
