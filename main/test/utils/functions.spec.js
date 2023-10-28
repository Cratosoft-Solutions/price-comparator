const currencyExchangeUtil = require("../../utils/currencyExchangeUtil.js");
const chai = require('chai');
const assert = chai.assert;

describe("Currency Exchange Tests", () => {
  describe("Format price test suite", () => {
    it("Format 0,00.00 format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice("2,160.00"), "2,160.00");
    });
    it("Format 000.00 format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice("2160.00"), "2,160.00");
    });
    it("Format null value format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice(null), null);
    });
    it("Format return 0 when unexpected format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice("rtrtr"), "0.00");
    });
    it("Format 2,160,003.00 format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice("2,160,003.00"), "2,160,003.00");
    });
    it("Format 10000 format", function () {
      assert.equal(currencyExchangeUtil.getFormattedPrice("10000"), "10,000.00");
    });
  });
});