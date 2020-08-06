import EditText from 'modules/data/attributes/edit/EditText'
import EditNumber from 'modules/data/attributes/edit/EditNumber'
import EditLogic from 'modules/data/attributes/edit/EditLogic'
import EditMoney from 'modules/data/attributes/edit/EditMoney'

const attributes = [
  {
    edit: EditText,
    id: 'text',
    options: [
      {
        defaultValue: false,
        id: 'multiline',
        name: 'is-multiline-field',
        type: 'bool',
      },
    ],
  },
  {
    edit: EditNumber,
    id: 'number',
  },
  {
    edit: EditLogic,
    id: 'logic',
  },
  {
    edit: EditMoney,
    id: 'money',
    options: [
      {
        defaultValue: 'usd',
        id: 'currency',
        name: 'currency',
        opts: [
          {
            name: 'USD',
            value: 'usd',
          },
          {
            name: 'EUR',
            value: 'eur',
          },
          {
            name: 'RUB',
            value: 'rub',
          },
        ],
        type: 'select',
      },
    ],
  },
]

export default attributes
