import React from 'react';
import { Card } from 'semantic-ui-react';
import CompanyCard from './company-card'

export default function CompanyList({companies, history, deleteCompany}){
  const list = () => {
    return companies.map(company => {
      return (
        <CompanyCard key={company._id} company={company} history={history} deleteCompany={deleteCompany}/>
      )
    })
  }

  return (
      <Card.Group>
        { list() }
      </Card.Group>
  )

}
