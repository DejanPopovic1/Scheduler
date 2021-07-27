import { Form, FormGroup } from "react-bootstrap";
import './Schedule.css';
import {Row, Col, Button} from 'reactstrap';
import {AgGridColumn, AgGridReact} from 'ag-grid-react'
import { Component } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

//import 'react-bootstrap';

class Schedule extends Component{
  constructor(props) {
    debugger;
    super(props);
    this.state = this.getInitialState();
  }

  componentDidUpdate = () => {
    var test = "test";
    debugger;
  }

  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

  rowClicked = () => {
    let selectedRows = this.gridApi.getSelectedRows();
    debugger;
  }

  onMatterGridCellFocused = () => {

  }

  onChangeDate = () => {
    // var changedDate = new Date(2019, 10, 3);
    // var changedDateString = this.formatDate(changedDate);
     this.setState({date: document.getElementById("datePicker").value});
    debugger;  
  }

  getInitialState = () => {
    var defaultDate = new Date();
    var defaultDateString = this.formatDate(defaultDate);
    return {
      date: defaultDateString,
      rowSelection: "single",
      columnDefs: [
        {headerName: "Schedule Name", field: "scheduleName"},
        {headerName: "Schedule Name2", field: "scheduleName2"}
      ], 








    //   const estateLate = this.props.systemType !== SystemTypeEnum.Liquidation.id;
    //   const liquidation = this.props.systemType !== SystemTypeEnum.EstateLate.id;
    //   const curatorship = this.props.systemType !== SystemTypeEnum.Curatorship.id;
    //   const livingLD = this.props.systemType !== SystemTypeEnum.LivingLD.id;
    //   const isSuperAdmin = !this.props.roles.some(role => RoleEnum.SuperAdmin.Name === role);
    //   return {
    //     columnDefs: [
    //       {headerName: "Status", field: "matterStatusName"},
    //       {headerName: "Matter Ref", field: "matterRef"},
    //       {headerName: "Insolvent/s", field: "insolventsName", hide: estateLate},
    //       {headerName: "Deceased", field: "insolventsName", hide: liquidation},
    //       {headerName: "Individual", field: "insolventsName", hide: curatorship && livingLD},
    //       {headerName: "Referrer Name", field: "referrerName", hide: estateLate},
    //       {
    //         headerName: "Executor", field: "executorDetails", hide: liquidation && livingLD, colId: "executorDetails",
  
    //       },
    //       {headerName: "Masters Reference", field: "mastersReference", hide: estateLate},
    //       {headerName: "Estate Number", field: "mastersReference", hide: curatorship},
    //       {headerName: "Created", field: "base_CreatedDate", valueFormatter: DateTimeFormat},
    //       //{ headerName: "Type", field: "matterTypeName", hide: !curatorship },
    //       {headerName: "User", field: "username"},
    //       {headerName: "Intermediary", field: "intermediaryName", hide: isSuperAdmin},
    //       {
    //         headerName: "Actions", width: 180, field: "action", hide: liquidation && curatorship,
    //         cellRenderer: "quickGlanceRenderer", suppressNavigable: true,
    //         editable: false,
    //         cellClass: 'no-border'
    //       },
    //       {headerName: "Watch", width: 140, field: "watch", cellRenderer: "watchListRenderer"},
    //     ],
           overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
         rowBuffer: 0,
           
         rowData: [
          {make: "Toyota", model: "Celica", price: 35000},
          {make: "Ford", model: "Mondeo", price: 32000},
          {make: "Porsche", model: "Boxter", price: 72000}
      ],
         rowModelType: "infinite",
         infiniteInitialRowCount: 1,
           context: {componentParent: this}
    };
  }

render(){
  return (
    <div class="container mt-3">
      <h1>Schedule a Pickup</h1>
      <form>
        <Form.Group>
          <Form.Label>Select Date to Schedule</Form.Label>
          <Form.Control
            id="datePicker"
            type="date"
            onChange = {this.onChangeDate}
            //value={this.state.date}
            value={this.state.date}
          />
        </Form.Group>
      </form>

      <Row>
        <Col sm="12">
          <div className="ag-theme-alpine"
               style={{
                 boxSizing: "border-box",
                 height: "300px",
                 width: "100%"
               }}>
            <AgGridReact
               rowData={[
                {scheduledItem: "Desslivery to Michael"},
                {scheduledItem: "Deliaavery to Michaels"},
                {scheduledItem: "Delivery to Michaelss"}
            ]}>
               <AgGridColumn field="scheduledItem"></AgGridColumn>



            </AgGridReact>
          </div>
          <Button roleEvaluate roleReason color="secondary" size="sm" style={{float: 'right'}}
                  //onClick={this.onDownloadCSV}
                  >Export To CSV</Button>
        </Col>
      </Row>
    </div>
  );
}
}

export default Schedule;
  

// function Schedule() {
//     return (
//       <div class="container mt-3">
//         <h1>Schedule a Pickup</h1>
//         <form>
//           <Form.Group>
//             <Form.Label>Select Date to Schedule</Form.Label>
//             <Form.Control type="date"/>
//           </Form.Group>
//         </form>

//         <Row>
//           <Col sm="12">
//             <div className="ag-theme-balham"
//                  style={{
//                    boxSizing: "border-box",
//                    height: "400px",
//                    width: "100%"
//                  }}>
//               <AgGridReact
//                 enableColResize
//                 rowSelection={this.state.matterGrid.rowSelection}
//                 columnDefs={this.state.matterGrid.columnDefs}
//                 statusBar={this.state.matterGrid.statusBar}
//                 onRowClicked={this.onMatterGridSelectionChanged}
//                 onCellFocused={this.onMatterGridCellFocused}
//                 context={this.state.matterGrid.context}
//                 frameworkComponents={this.state.matterGrid.frameworkComponents}
//                 onGridReady={this.onMatterGridReady}
//                 rowData={this.state.matterGrid.rowData}
//                 rowBuffer={this.state.matterGrid.rowBuffer}

//                 overlayLoadingTemplate={this.state.matterGrid.overlayLoadingTemplate}
//                 rowModelType={this.state.matterGrid.rowModelType}
//                 paginationPageSize={this.state.matterGrid.paginationPageSize}
//                 cacheOverflowSize={this.state.matterGrid.cacheOverflowSize}
//                 maxConcurrentDatasourceRequests={this.state.matterGrid.maxConcurrentDatasourceRequests}
//                 infiniteInitialRowCount={this.state.matterGrid.infiniteInitialRowCount}
//                 maxBlocksInCache={this.state.matterGrid.maxBlocksInCache}
//                 cacheBlockSize={this.state.matterGrid.cacheBlockSize}
//                 pagination={true}
//                 paginationAutoPageSize={true}
//               />
//             </div>
//             <Button roleEvaluate roleReason color="secondary" size="sm" style={{float: 'right'}}
//                     //onClick={this.onDownloadCSV}
//                     >Export To CSV</Button>
//           </Col>
//         </Row>
//       </div>
//     );
//   }

//export default Schedule;
  

