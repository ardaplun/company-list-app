import React from 'react';
import { Modal,Button,Icon } from 'semantic-ui-react';

export default function CompanyList({open, confirm}){
  const inlineStyle = {
    modal : {
      marginTop: '0px !important',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };
  return (
      <Modal size={'mini'} open={open} onClose={()=>confirm(false)} style={inlineStyle.modal}>
        <Modal.Header>
          Delete
        </Modal.Header>
        <Modal.Content>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
        <Button basic color='red' onClick={()=>confirm(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' onClick={()=>confirm(true)}>
          <Icon name='checkmark' /> Yes
        </Button>
        </Modal.Actions>
      </Modal>
  )

}
