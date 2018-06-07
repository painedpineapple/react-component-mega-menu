import React from 'react'
import { render } from 'react-dom'
import faker from 'faker'
import _ from 'lodash'
//
import MegaMenu from './MegaMenu'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

let menuItems = []
let count = 6

while (count > 0) {
  menuItems.push({
    id: faker.random.uuid(),
    title: faker.lorem.word(),
    url: count % 3 ? '' : faker.internet.url(),
    items: _.times(faker.random.number(5), () => ({
      id: faker.random.uuid(),
      title: faker.lorem.word(),
      url: count % 3 ? '' : faker.internet.url(),
      items: _.times(faker.random.number(8), () => ({
        id: faker.random.uuid(),
        title: faker.lorem.word(),
        url: faker.internet.url(),
      })),
    })),
  })
  count -= 1
}

const menuStyles = {}

const App = () => (
  <div style={styles}>
    <MegaMenu
      options={{
        items: menuItems,
        styles: menuStyles,
      }}
    />
  </div>
)

render(<App />, document.getElementById('root'))
