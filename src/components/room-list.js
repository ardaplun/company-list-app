import React from 'react';
import { Card } from 'semantic-ui-react';
import RoomCard from './room-card'

export default function CompanyList({rooms, deleteRoom, office, history, company,i }){
  const list = () => {
    if(rooms && rooms.length > 0){
      return rooms.map((room,j) => {
        console.log(room);
        return (
          <RoomCard key={i} room={room} i={i} j={j} office={office} company={company} deleteRoom={deleteRoom}/>
        )
      })
    }else{
      return (<p>No Meeting Room Yet</p>)
    }
  }

  return (
      <Card.Group>
        { list() }
      </Card.Group>
  )

}
