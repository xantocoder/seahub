import React from 'react';
import PropTypes from 'prop-types';
import { gettext, username } from '../../utils/constants';
import { seafileAPI } from '../../utils/seafile-api';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class LeaveGroupDialog extends React.Component {

  constructor(props) {
    super(props);
  }

  leaveGroup = () => {
    seafileAPI.quitGroup(this.props.groupID, username).then((res)=> {
      this.props.onGroupChanged();
    });
  }

  render() {
    return(
      <Modal isOpen={true} toggle={this.props.toggleLeaveGroupDialog}>
        <ModalHeader toggle={this.props.toggleLeaveGroupDialog}>{gettext('Leave Group')}</ModalHeader>
        <ModalBody>
          <p>{gettext('Really want to leave this group?')}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggleLeaveGroupDialog}>{gettext('Cancel')}</Button>
          <Button color="primary" onClick={this.leaveGroup}>{gettext('Leave')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const LeaveGroupDialogPropTypes = {
  toggleLeaveGroupDialog: PropTypes.func.isRequired,
  groupID: PropTypes.string.isRequired,
  onGroupChanged: PropTypes.func.isRequired,
};

LeaveGroupDialog.propTypes = LeaveGroupDialogPropTypes;

export default LeaveGroupDialog;
