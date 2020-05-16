import * as React from 'react'

type Props = {
  items: any[]
}

const Menu: React.FunctionComponent<Props> = ({
  items,
}) => (
  <div>
    <h1>Detail for {typeof items}</h1>
  </div>
)

export default Menu
