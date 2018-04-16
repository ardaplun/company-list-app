import React from 'react';
import { Card } from 'semantic-ui-react';
import OfficeCard from './office-card'

export default function CompanyList({offices, deleteOffice, company}){
  const list = () => {
    if(offices.length > 0){
      return offices.map((office,i) => {
        return (
          <OfficeCard key={i} company={company} i={i} office={office} deleteOffice={deleteOffice}/>
        )
      })
    }else{
      return (<p>No Offices Yet</p>)
    }
  }

  return (
      <Card.Group>
        { list() }
      </Card.Group>
  )

}
