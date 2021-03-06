'use strict';

/**
 * This class includes the utitity functions.
 * @class
 * @classdesc Provides the common utility functions.
 */
class Utils {
  /**
   * Helper function to send ethereum transaction.
   *
   * @param {Object} tx Transaction object.
   * @param {Object} tx Transaction options.
   *
   * @returns {Promise} Promise object.
   */
  static async sendTransaction(tx, txOption) {
    return new Promise(async (onResolve, onReject) => {
      const txOptions = Object.assign({}, txOption);
      if (!txOptions.gas) {
        txOptions.gas = await tx.estimateGas(txOptions);
      }

      tx.send(txOptions)
        .on('receipt', (receipt) => onResolve(receipt))
        .on('error', (error) => onReject(error))
        .catch((exception) => onReject(exception));
    });
  }
}

module.exports = Utils;
