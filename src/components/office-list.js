import React from 'react';
import { Card } from 'semantic-ui-react';
import OfficeCard from './office-card'

export default function CompanyList({offices, deleteOffice, history, company, i}){
  const list = () => {
    if(offices.length > 0){
      return offices.map((office,i) => {
        return (
          <OfficeCard key={office.name+i} company={company} i={i} history={history} office={office} deleteOffice={deleteOffice}/>
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
