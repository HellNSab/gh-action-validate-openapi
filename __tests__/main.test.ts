import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

let debugMock: jest.SpiedFunction<typeof core.debug>
let errorMock: jest.SpiedFunction<typeof core.error>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
  })

  it('does not set a failed status if the open api file is a valid open api json file', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filepath':
          return './__tests__/data/valid-open-api-file.json'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Validating ./__tests__/data/valid-open-api-file.json ...'
    )
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'API name: Webhook Example, Version: 1.0.0')
    expect(setFailedMock).not.toHaveBeenCalled()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('does not set a failed status if the open api file is a valid open api yaml file', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filepath':
          return './__tests__/data/valid-open-api-file.yml'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Validating ./__tests__/data/valid-open-api-file.yml ...'
    )
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'API name: Webhook Example, Version: 1.0.0')
    expect(setFailedMock).not.toHaveBeenCalled()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('sets a failed status if the open api file is an invalid open api json file', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filepath':
          return './__tests__/data/invalid-open-api-file.json'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Validating ./__tests__/data/invalid-open-api-file.json ...'
    )
    expect(setFailedMock).toHaveBeenCalled()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('sets a failed status if the open api file is an invalid open api yaml file', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filepath':
          return './__tests__/data/invalid-open-api-file.yml'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'Validating ./__tests__/data/invalid-open-api-file.yml ...'
    )
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'API name: Webhook Example, Version: 1.0.0')
    expect(setFailedMock).toHaveBeenCalled()
    expect(errorMock).not.toHaveBeenCalled()
  })

  it('sets a failed status if the passed file path is invalid', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filepath':
          return 'fake_path'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(setFailedMock).toHaveBeenCalled()
    expect(errorMock).not.toHaveBeenCalled()
  })
})
