# Postel-ITA

Postel-ITA is a library to create files compatible with the Italian Poste Postel system.

## Installation

To install the library, use the following command:

```sh
pnpm install postel-ita
```

## Usage

Here is an example of how to use the library:

```typescript
import { Postel, Currency, Payment } from 'postel-ita';

const postel = new Postel();

const headerParams = {
  // ...header parameters...
};

const paymentParams = {
  // ...payment parameters...
};

postel.header.init(headerParams);

const payment = new Payment(paymentParams);
postel.payments.push(payment);

const mBody = postel.payments[0].missive.body;

mBody
  .addRow(10, 'abs')
  .appendText('€' + paymentParams.comm.amount.toPostelString())
  .setMaxWidth(21)
  .setAlignRight(36);

// ...additional code...

console.log(postel.result());
```

## Changelog

See the [CHANGELOG](./CHANGELOG.md) for details on changes and updates.

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.
