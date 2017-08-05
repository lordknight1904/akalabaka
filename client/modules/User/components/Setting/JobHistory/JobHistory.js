import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../../../styles.css'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import styles from '../../../../App/App.css';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui/Divider';
import JobHistoryEdit from './JobHistoryEdit';
import Records from './Records';

import { getJobHistory } from '../../../../App/AppReducer';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class JobHistory extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
    };
  }
  handleEdit = () => {this.setState({isEdit: !this.state.isEdit});};
  render(){
    return (
      <Card expanded onExpandChange={this.handleEdit}>
        <CardHeader
          style={{fontWeight: 'bold'}}
          title={<FormattedMessage id='jobHistory' />}
          showExpandableButton={false}
        />
        <Divider />
        <CardText expandable={true}>
          {
            (this.state.isEdit) ? (
              <div style={{ marginBottom: '30px' }}>
                <JobHistoryEdit handleEdit={this.handleEdit} />
              </div>
              ) : ''
          }
          {
            (this.props.jobHistory.length > 0) ? (
              <div>
                <Table>
                  <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
                    <TableRow>
                      <TableHeaderColumn><FormattedMessage id='jobHis' /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id='workplaceHis' /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id='fromHis' /></TableHeaderColumn>
                      <TableHeaderColumn><FormattedMessage id='toHis' />To</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false} stripedRows>
                    {
                      this.props.jobHistory.map((his, index) => (
                        <TableRow key={index}>
                          <TableRowColumn>{his.job}</TableRowColumn>
                          <TableRowColumn>{his.workPlace}</TableRowColumn>
                          <TableRowColumn>{new Date(his.from).getMonth() + '/' + new Date(his.from).getYear()}</TableRowColumn>
                          <TableRowColumn>{new Date(his.to).getMonth() + '/' + new Date(his.to).getYear()}</TableRowColumn>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </div>
              ) : ''
          }
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    intl: state.intl,
    jobHistory: getJobHistory(state),
  };
}
JobHistory.propTypes = {
  intl: PropTypes.object.isRequired,
  jobHistory: PropTypes.array.isRequired,
};
JobHistory.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(JobHistory);
