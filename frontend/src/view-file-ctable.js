import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './pages/data-grid/app-header';
import AppMain from './pages/data-grid/app-main';
import { seafileAPI } from './utils/seafile-api';
import { Utils } from './utils/utils';
import { gettext } from './utils/constants';
import toaster from './components/toast';

import './css/layout.css';
import './css/file-view-data-grid.css';
import './css/react-context-menu.css';

const { repoID, fileName, filePath, err, enableWatermark, userNickName } = window.app.pageOptions;

class ViewFileSDB extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initData: {
        columns: [],
        rows: [],
      },
      isContentChanged: false,
    };

  }

  componentDidMount() {
    seafileAPI.getFileDownloadLink(repoID, filePath).then(res => {
      let url = res.data;
      seafileAPI.getFileContent(url).then(res => {
        let data = res.data;
        if (data) {
          this.setState({initData: data});
        }
      });
    });
  }

  onSave = () => {
    let data = this.refs.data_grid.serializeGridData();
    this.setState({
      initData: data,
      isContentChanged: false
    })
    
    let dirPath = Utils.getDirName(filePath);
    seafileAPI.getUpdateLink(repoID, dirPath).then(res => {
      let updateLink = res.data;
      let updateData = JSON.stringify(data);
      seafileAPI.updateFile(updateLink, filePath, fileName, updateData).then(res => {
        toaster.success(gettext('File saved.'));
      }).catch(() => {
        toaster.success(gettext('File save failed.'));
      });
    });
  }

  onContentChanged = () => {
    this.setState({isContentChanged: true});
  }

  render() {
    return (
      <Fragment>
        <AppHeader 
          onSave={this.onSave} 
          isContentChanged={this.state.isContentChanged}
        />
        <AppMain 
          initData={this.state.initData} 
          ref="data_grid" 
          onContentChanged={this.onContentChanged} 
          isContentChanged={this.state.isContentChanged}
          onSave={this.onSave}
        />
      </Fragment>
    );
  }
}

ReactDOM.render(
  <ViewFileSDB />,
  document.getElementById('wrapper')
);