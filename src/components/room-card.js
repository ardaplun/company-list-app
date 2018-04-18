import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

export default function RoomCard({room, deleteRoom, company, i, j }) {
  i = parseInt(i,10)
  console.log(i,j);
  return (
    <Card >
      <Card.Content>
        <Card.Header>
          {room.name}
          <Icon name='window close' style={{position:'absolute', right:'1rem'}} onClick={() => deleteRoom({company,i,j})}/>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p><b>Size</b><br/>{room.size}</p>
          <p><b>Floor</b><br/>{room.floor}</p>
          <p><b>Capacity</b><br/>{room.capacity}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
