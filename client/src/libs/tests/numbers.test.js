import { naira, currency } from '../numbers/currency';
// import { log } from '../helpers';
/* eslint-disable */

it('formats as expected', () => {
  const numberWithDecimal = '1200.23';

  expect(naira).toBeInstanceOf(Function);
  expect(naira('1250')).toStrictEqual(naira('1250'));
  expect(naira(numberWithDecimal)).toEqual(naira(numberWithDecimal));
  expect(
    currency('en-US')({ currency: 'NGN', currencyDisplay: 'name' })(
      numberWithDecimal
    )
  ).toEqual('1,200.23 Nigerian nairas');
});

it('returns NaN when input is invalid', () => {
  const invalids = ['1.2.300', 'helloman', { num: 122 }];
  invalids.forEach(e => expect(naira(e)).toEqual('NGNNaN'));
});
