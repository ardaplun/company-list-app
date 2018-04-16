import React from 'react';
import { Card, Icon } from 'semantic-ui-react'

export default function CompanyCard({company, history, deleteCompany}) {
  return (
    <Card >
      <Card.Content>
        <Card.Header>
          <span onClick={() => history.push('/'+company._id)}>
            {company.name}
          </span>
          <Icon name='window close' style={{position:'absolute', right:'1rem'}} onClick={() => deleteCompany(company._id)}/>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p><b>Address</b><br/>{company.address}</p>
          <p><b>Revenue</b><br/>{company.revenue}</p>
          <p><b>Phone No.</b><br/>({company.phoneCode}) {company.phoneNum}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
