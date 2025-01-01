export const linking = {
  prefixes: ['bankstreet://', 'https://bankstreet.app'],
  config: {
    screens: {
      Home: {
        path: 'home',
        screens: {
          BankStation: 'bank-station',
          BankStore: 'bank-store',
          BankAtlas: 'bank-atlas',
        },
      },
      Transaction: {
        path: 'transaction/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      Product: {
        path: 'product/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      ATM: {
        path: 'atm/:id',
        parse: {
          id: (id: string) => id,
        },
      },
      Settings: 'settings',
    },
  },
}
