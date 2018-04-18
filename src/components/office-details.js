import React from 'react';
import { Grid, Button, Card } from 'semantic-ui-react'
import moment from 'moment';

export default function CompanyCard({office, history}) {
  return (
    <Grid centered >
      <Grid.Column>
        <Card fluid>
          <Card.Content>
            <Card.Header>{office.name}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              <p><b>Location</b><br/>Lat: {office.lat}<br />Lng: {office.lng}</p>
              <p><b>Office Start Date</b><br/>{moment(office.startDate).format('DD/MM/YYYY')}</p>
              <Button className='pull-right' primary onClick={() => history.goBack()}>Back</Button>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}
