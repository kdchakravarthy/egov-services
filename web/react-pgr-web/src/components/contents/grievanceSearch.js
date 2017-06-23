import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Row, Col, DropdownButton} from 'react-bootstrap';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import {brown500, red500,white,orange800} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ReactPaginate from 'react-paginate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Api from '../../api/api';

const getNameByProperty = function(object, key) {
	if(object) {
		for(var i=0; i<object.length; i++) {
			if(object[i]["key"] == key) {
				return object[i]["name"];
			}
		}
		return "";
	} else {
		return "";
	}
}

const styles = {
  headerStyle : {
    color: 'rgb(90, 62, 27)',
    fontSize : 19
  },
  marginStyle:{
    margin: '15px'
  },
  paddingStyle:{
    padding: '15px'
  },
  errorStyle: {
    color: red500
  },
  underlineStyle: {
    borderColor: brown500
  },
  underlineFocusStyle: {
    borderColor: brown500
  },
  floatingLabelStyle: {
    color: brown500
  },
  floatingLabelFocusStyle: {
    color: brown500
  },
  customWidth: {
    width:100
  }
};

class grievanceSearch extends Component {
  constructor(props) {
       super(props);
       this.state = {
       		locationList: [],
       		complaintTypeList: [],
       		statusList: [],
       		receiveingModeList: [],
       		departmentList: [],
       		boundaryList: [],
       		open: false,
       		resultList: [],
       		isSearchClicked: false,
       		pageCount: 0,
       		fromIndex: 0
       };
       this.search = this.search.bind(this);
       this.setInitialState = this.setInitialState.bind(this);
       this.handleOpenNClose = this.handleOpenNClose.bind(this);
       this.resetAndSearch = this.resetAndSearch.bind(this);
       this.handlePageClick = this.handlePageClick.bind(this);
  }

  handleOpenNClose() {
    this.setState({
    	open: !this.state.open
    });
  };

  resetAndSearch(e) {
  	e.preventDefault();
  	var self = this;
  	this.setState({
  		fromIndex: 0,
  		pageCount: 0
  	}, function() {
  		self.search();
  	})
  }

  search(bool) {
  	var self = this, grievanceSearchSet = this.props.grievanceSearchSet;
  	if(!grievanceSearchSet.serviceRequestId && !grievanceSearchSet.locationId && !grievanceSearchSet.startDate && !grievanceSearchSet.endDate && !grievanceSearchSet.name && !grievanceSearchSet.mobileNumber && !grievanceSearchSet.emailId && !grievanceSearchSet.serviceCode && !grievanceSearchSet.status && !grievanceSearchSet.receiving_mode) {
  		self.setState({
  			open: true
  		})
  	} else {
  		var searchSet = Object.assign({}, grievanceSearchSet);
  		if(searchSet.startDate) {
  			searchSet.startDate = searchSet.startDate.getDate() + "-" + (searchSet.startDate.getMonth() + 1) + "-" + searchSet.startDate.getFullYear();
  		}

  		if(searchSet.endDate) {
  			searchSet.endDate = searchSet.endDate.getDate() + "-" + (searchSet.endDate.getMonth() + 1) + "-" + searchSet.endDate.getFullYear();
  		}

  		if(searchSet.status) {
  			searchSet.status = searchSet.status.join(",");
  		}

  		searchSet.sizePerPage = 10;
  		searchSet.fromIndex = self.state.fromIndex;
  		Api.commonApiPost("/pgr/seva/_count", searchSet).then(function(response) {
  			if(response.count) {
  				Api.commonApiPost("/pgr/seva/_search", searchSet).then(function(response1) {
		      		self.setState({
		      			resultList: response1.serviceRequests || [],
		      			isSearchClicked: true,
		      			pageCount: Math.ceil(response.count / 10)
		      		});
			    }, function(err) {
			    	
			    });
  			}
  		}, function(err) {
	    	
	    });
  	}
  }

  setInitialState(_state) {
  	this.setState(_state);
  }

  componentDidMount() {
  	var self = this, count = 6, _state = {};
  	self.props.initForm();
  	const checkCountAndCall = function(key, res) {
  		_state[key] = res;
  		count--;
  		if(count == 0) {
  			self.setInitialState(_state);
  		}
  	}

  	this.props.changeButtonText("More");
  	Api.commonApiPost("/egov-location/boundarys/boundariesByBndryTypeNameAndHierarchyTypeName", {boundaryTypeName: "Ward", hierarchyTypeName: "Administration"}).then(function(response) {
      	checkCountAndCall("locationList", response.Boundary);
    }, function(err) {
    	checkCountAndCall("locationList", []);
    });

    Api.commonApiPost("/pgr/receivingmode/_search").then(function(response) {
      	checkCountAndCall("receiveingModeList", response.receivingModes);
    }, function(err) {
    	checkCountAndCall("receiveingModeList", []);
    });

    Api.commonApiPost("pgr/services/_search", {type: "all"}).then(function(response) {
      	checkCountAndCall("complaintTypeList", response.complaintTypes);
    }, function(err) {
    	checkCountAndCall("complaintTypeList", []);
    });

    Api.commonApiPost("/egov-common-masters/departments/_search").then(function(response) {
      	checkCountAndCall("departmentList", response.Department);
    }, function(err) {
    	checkCountAndCall("departmentList", []);
    });

    Api.commonApiPost("/egov-location/boundarys", {"boundary.tenantId": localStorage.getItem("tenantId")}).then(function(response) {
      	checkCountAndCall("boundaryList", response.Boundary);
    }, function(err) {
    	checkCountAndCall("boundaryList", []);
    });

    Api.commonApiPost("/workflow/v1/statuses/_search").then(function(response) {
      	checkCountAndCall("statusList", response.statuses);
    }, function(err) {
    	checkCountAndCall("statusList", []);
    });
  }

  handlePageClick(data) {
    let selected = data.selected;
    let offset = Math.ceil(selected * 10), self = this;
    self.setState({fromIndex: offset}, () => {
      self.search(true);
    });
  };

  render() {
  	let {search, resetAndSearch, handlePageClick} = this;
  	let {
  		complaintTypeList, 
  		statusList, 
  		receiveingModeList, 
  		locationList, 
  		departmentList, 
  		boundaryList, 
  		isSearchClicked, 
  		resultList, 
  		pageCount
  	} = this.state;
  	let {
		handleChange,
		buttonText, 
		grievanceSearchSet, 
		changeButtonText,
		isFormValid,
		fieldErrors
  	} = this.props;

  	const renderBody = function() {
  		if(resultList.length) {
  			return resultList.map(function(val, i) {
  				return (
  					<TableRow key={i}>
  						<TableRowColumn>{val.serviceRequestId}</TableRowColumn>
  						<TableRowColumn>{val.serviceName}</TableRowColumn>
  						<TableRowColumn>{val.firstName}</TableRowColumn>
  						<TableRowColumn>{(getNameByProperty(boundaryList, getNameByProperty(val.attribValues, "locationId"))) + "-" + (getNameByProperty(boundaryList, getNameByProperty(val.attribValues, "childLocationId")))}</TableRowColumn>
  						<TableRowColumn>{getNameByProperty(val.attribValues, "status")}</TableRowColumn>
  						<TableRowColumn>{getNameByProperty(departmentList, getNameByProperty(val.attribValues, "departmentId"))}</TableRowColumn>
  						<TableRowColumn>{val.requestedDatetime}</TableRowColumn>
  					</TableRow>
  				)
  			})
  		}
  	}

  	const displayTableCard = function() {
  		if(isSearchClicked) {
  			return (
	  			<Card style={styles.marginStyle}>
		          	<CardHeader style={{paddingBottom: 0}} title={<div style = {styles.headerStyle} > Search Result </div>}/>
	  				{showTable()}
	  				{showPagination()}
	  			</Card>
	  		)
  		}
  	}
  	const showTable = function() {
			return (
				<Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
			      <TableRow>
			        <TableHeaderColumn>Application No.</TableHeaderColumn>
			        <TableHeaderColumn>Grivience/Service Type</TableHeaderColumn>
			        <TableHeaderColumn>Name</TableHeaderColumn>
			        <TableHeaderColumn>Location</TableHeaderColumn>
			        <TableHeaderColumn>Status</TableHeaderColumn>
			        <TableHeaderColumn>Department</TableHeaderColumn>
			        <TableHeaderColumn>Registered Date</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    	{renderBody()}
			    </TableBody>
		    </Table>
			)
  	}

  	const showPagination = function() {
			return (
				<div style={{"textAlign": "center"}}>
					<ReactPaginate previousLabel={"Previous"}
                   nextLabel={"Next"}
                   breakLabel={<a href="">...</a>}
                   pageCount={pageCount}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={5}
                   onPageChange={handlePageClick}
                   containerClassName={"pagination"}
                   subContainerClassName={"pages pagination"}
                   activeClassName={"active"} />
            </div>
		)
  	}

  	const showOtherFields = function() {
  		if(buttonText == "Less") {
  			return (
  				<Row>
                	<Col xs={12} md={3}>
        				<TextField fullWidth={true} floatingLabelText="Full Name" value={grievanceSearchSet.name} onChange={(e) => {handleChange(e, "name", false, "")}}/>
        			</Col>
        			<Col xs={12} md={3}>
        				<TextField fullWidth={true} floatingLabelText="Mobile Number" errorText={fieldErrors.mobileNumber} value={grievanceSearchSet.mobileNumber} onChange={(e) => {handleChange(e, "mobileNumber", false, /^\d{10}$/g)}}/>
        			</Col>
        			<Col xs={12} md={3}>
        				<TextField fullWidth={true} floatingLabelText="Email ID" errorText={fieldErrors.emailId} value={grievanceSearchSet.emailId} onChange={(e) => {handleChange(e, "emailId", false, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)}}/>
        			</Col>
        			<Col xs={12} md={3}>
        				<SelectField maxHeight={200} fullWidth={true} floatingLabelText="Complaint Type" value={grievanceSearchSet.serviceCode} onChange={(e, i, val) => {
        					var e = {target: {value: val}};
        					handleChange(e, "serviceCode", false, "")}}>
                			{complaintTypeList.map((com, index) => (
                                <MenuItem value={com.serviceCode} key={index} primaryText={com.serviceName} />
                            ))}
                		</SelectField>
        			</Col>
        			<Col xs={12} md={3}>
	                	<SelectField maxHeight={200} fullWidth={true} floatingLabelText="Status" value={grievanceSearchSet.status} onChange={(e, i, val) => {
	                		var e = {target: {value: val}};
	                		handleChange(e, "status", false, "")}} multiple>
                    		{statusList.map((stat, index) => (
                                <MenuItem value={stat.code} key={index} primaryText={stat.name} />
                            ))}
                    	</SelectField>
                	</Col>
                	<Col xs={12} md={3}>
                    	<SelectField maxHeight={200} fullWidth={true} floatingLabelText="Receiving Mode" value={grievanceSearchSet.receiving_mode} onChange={(e, i, val) => {
                    		var e = {target: {value: val}};
                    		handleChange(e, "receiving_mode", false, "")}}>
                    		{receiveingModeList.map((mod, index) => (
                                <MenuItem value={mod.code} key={index} primaryText={mod.name} />
                            ))}
                    	</SelectField>
                	</Col>
                </Row>
  			)
  		}
  	}
  	return (
  		<div className="grievanceCreate">
	        <form autoComplete="off" onSubmit={(e) => {resetAndSearch(e)}}>
	          <Card style={styles.marginStyle}>
	          	<CardHeader style={{paddingBottom:0}} title={<div style = {styles.headerStyle} > Search Grievance </div>}/>
	            	<CardText style={{padding:0}}>
	              		<Grid>
	                		<Row>
	                			<Col xs={12} md={3}>
	                				<TextField fullWidth={true} floatingLabelText="SRN(Service Request No.)" value={grievanceSearchSet.serviceRequestId} onChange={(e) => {handleChange(e, "serviceRequestId", false, "")}}/>
	                			</Col>
	                			<Col xs={12} md={3}>
	                				<SelectField maxHeight={200} fullWidth={true} floatingLabelText="Location" value={grievanceSearchSet.locationId} onChange={(e, i, val) => {
	                					var e = {target: {value: val}};
	                					handleChange(e, "locationId", false, "")}}>
                            			{locationList.map((loc, index) => (
			                                <MenuItem value={loc.id} key={index} primaryText={loc.name} />
			                            ))}
                            		</SelectField>
	                			</Col>
	                			<Col xs={12} md={3}>
	                				<DatePicker floatingLabelText="From Date" hintText="From Date" container="inline" value={grievanceSearchSet.startDate} onChange={(e, dat) => {
	                					var e = {target: {value: dat}};
	                					handleChange(e, "startDate", false, "")
	                				}}/>
	                			</Col>
	                			<Col xs={12} md={3}>
	                				<DatePicker floatingLabelText="To Date" hintText="To Date" container="inline" value={grievanceSearchSet.toDate} onChange={(e, dat) => {
	                					var e = {target: {value: dat}};
	                					handleChange(e, "toDate", false, "");
	                				}}/>
	                			</Col>
	                		</Row>
	                		<Row>
			                    <Col xs={12} md={12}>
			                      <FlatButton
			                        backgroundColor="#a4c639"
			                        hoverColor="#8AA62F"
			                        label={buttonText}
			                        onClick={(e) => {e.preventDefault(); buttonText == "More" ? changeButtonText("Less") : changeButtonText("More")}}
			                      />
			                    </Col>
			                </Row>
			                {showOtherFields()}
	              		</Grid>
	            	</CardText>
	          </Card>
	          <div style={{textAlign: 'center'}}>
		          <RaisedButton style={{margin:'15px 5px'}} type="submit" label="Search" backgroundColor={"#5a3e1b"} labelColor={white}/>
	              <RaisedButton style={{margin:'15px 5px'}} label="Close"/>
              </div>
	        </form>
	        {displayTableCard()}
	        
	        <Dialog
	          title="Atleast one search criteria is required"
	          open={this.state.open}
	          onRequestClose={this.handleOpenNClose}
	          actions={<FlatButton
				        label="Close"
				        primary={true}
				        onTouchTap={this.handleOpenNClose}
				      />}>
	        </Dialog>
        </div>
  	);
  }
}

const mapStateToProps = state => {
    return ({grievanceSearchSet: state.form.form, fieldErrors: state.form.fieldErrors, isFormValid: state.form.isFormValid, buttonText: state.form.buttonText});
};
const mapDispatchToProps = dispatch => ({
    initForm: (type) => {
        dispatch({
	      type: "RESET_STATE",
	      validationData: {
	        required: {
	          current: [],
	          required: []
	        },
	        pattern: {
	          current: [],
	          required: ["mobileNumber", "emailId"]
	        }
	      }
	    });
    },
    handleChange: (e, property, isRequired, pattern) => {
        dispatch({ type: "HANDLE_CHANGE", property, value: e.target.value, isRequired, pattern });
    },
    changeButtonText:(text) => {
    	dispatch({type: "BUTTON_TEXT", text});
  	}
});


export default connect(mapStateToProps, mapDispatchToProps)(grievanceSearch);