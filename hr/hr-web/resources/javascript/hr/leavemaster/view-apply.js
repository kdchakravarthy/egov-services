class ViewApply extends React.Component {
  constructor(props) {
    super(props);
    this.state={list:[],leaveSet:{
      "employee": "",
      "name":"",
      "code":"",
       "leaveType": {
       	"id" : ""
       },
       "fromDate" : "",
       "toDate": "",
       "availableDays": "",
       "leaveDays":"",
       "reason": "",
       "status": "",
       "stateId": "",
       "tenantId" : tenantId
     }
  }

  }

  componentWillMount() {
    console.log(getUrlVars()["type"]);
    // console.log(getCommonMaster("hr-masters","grades","Grade").responseJSON["Grade"]);


  }



  componentDidMount() {
    var leaveApp = getCommonMaster("hr-leave","leaveapplications","LeaveApplication").responseJSON["LeaveApplication"];
    var empIds = [];
    for(var i=0; i<leaveApp.length; i++) {
      if(empIds.indexOf(leaveApp[i].employee) == -1)
        empIds.push(leaveApp[i].employee);
    }

    if(empIds.length > 0) {
      var employees = commonApiPost("hr-employee", "employees", "_search", {
        tenantId,
        id: empIds.join(",")
      }).responseJSON["Employee"];

      for(var i=0; i<leaveApp.length; i++) {
        employees.map(function(item, ind) {
          if(item.id == leaveApp[i].employee) {
            leaveApp[i].name = item.name;
            employees.splice(ind, 1);
          }
        })
      }
    }
    this.setState({
      list: leaveApp
    });
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevState.list.length!=this.state.list.length) {
          $('#viewleaveTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                     'copy', 'csv', 'excel', 'pdf', 'print'
             ],
             ordering: false
          });
      }
  }



  close() {
      // widow.close();
      open(location, '_self').close();
  }


  render() {
    console.log(this.state.leaveSet);
    let {list}=this.state;
    let {employee,name,code,leaveType,fromDate,toDate,availableDays,leaveDays,reason}=this.state.leaveSet;

    const renderAction=function(type,id){
      if (type==="view") {

              return (
                      <a href={`app/hr/leavemaster/apply-leave.html?id=${id}&type=${type}`} className="btn btn-default btn-action"><span className="glyphicon glyphicon-modal-window"></span></a>
              );

    }
}


    const renderBody=function()
    {
      return list.map((item,index)=>
      {
            return (<tr key={index}>
                    <td>{index+1}</td>
                    <td data-label="name">{item.name}</td>
                    <td data-label="fromDate">{item.fromDate}</td>
                    <td data-label="toDate">{item.toDate}</td>
                    <td data-label="availableDays">{item.availableDays}</td>
                    <td data-label="leaveDays">{item.leaveDays}</td>
                    <td data-label="reason">{item.reason}</td>
                    <td data-label="action">
                    {renderAction(getUrlVars()["type"],item.id)}
                    </td>
                </tr>
            );

      })
    }

      return (<div>
        <table id="viewleaveTable" className="table table-bordered">
            <thead>
                <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>fromDate</th>
                    <th>toDate</th>
                    <th>availableDays</th>
                    <th>leaveDays</th>
                    <th>reason</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody id="listsearchResultTableBody">
                {
                    renderBody()
                }
            </tbody>

        </table>
      </div>
    );
  }
}

ReactDOM.render(
  <ViewApply />,
  document.getElementById('root')
);
