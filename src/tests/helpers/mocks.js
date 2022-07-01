Object.defineProperties(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => { ranking: '[{ "name": "", "score": 0, "picture": "" }]' })
  },
})
