import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import moment from 'moment';

export default function CompanyCard({office, deleteOffice, history, company, i }) {
  return (
    <Card >
      <Card.Content>
        <Card.Header>
        <span onClick={() => history.push('/'+company._id+'/'+i)}>
          {office.name}
        </span>
          <Icon name='window close' style={{position:'absolute', right:'1rem'}} onClick={() => deleteOffice({company:company,i:i})}/>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p><b>Location</b><br/>Lat: {office.lat}<br />Lng: {office.lng}</p>
          <p><b>Office Start Date</b><br/>{moment(office.startDate).format('DD/MM/YYYY')}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
