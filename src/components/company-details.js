import React from 'react';
import { Grid, Button, Card } from 'semantic-ui-react'

export default function CompanyCard({company, history}) {
  return (
    <Grid centered >
      <Grid.Column>
        <Card fluid>
          <Card.Content>
            <Card.Header>{company.name}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              <p><b>Address</b><br/>{company.address}</p>
              <p><b>Revenue</b><br/>{company.revenue}</p>
              <p><b>Phone No.</b><br/>({company.phoneCode}) {company.phoneNum}</p>
              <Button className='pull-right' primary onClick={() => history.push('/')}>Back to Overview</Button>
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}
