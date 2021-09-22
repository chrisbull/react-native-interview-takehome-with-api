import renderer from 'react-test-renderer'
import React from 'react'
import App from './App'

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree.children.length).toBe(1)
  })

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('duration asleep is less than duration in bed', () => {
    const tree = renderer.create(<App />).toJSON()

    const durationInBedComponent = tree.getById('durationInBed')
    const durationAsleepComponent = tree.getById('durationAsleep')
    const submitButton = tree.getById('submit')

    fireEvent(durationInBedComponent).select(2)
    fireEvent(durationAsleepComponent).select(5)

    fireEvent(submitButton).click()

    expect(tree).toThrowError('Asleep cannot be greater than time in bed')
  })
})
