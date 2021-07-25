import { Form, FormGroup } from "react-bootstrap";
import './Schedule.css';
import {Row, Col, Button} from 'reactstrap';
import {AgGridReact} from 'ag-grid-react'
import { Component } from "react";
//import 'react-bootstrap';

class Schedule extends Component{
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

  getInitialState = () => {
    var defaultDate = new Date(2021, 11, 17);
    var defaultDateString = this.formatDate(defaultDate);

    //debugger;
    //var defaultDateString = "2021-11-01";
    return {
      date: defaultDateString
    };
  }

render(){
  //console.log(count)
  //console.log("this.defaultDateString");
  return (
    <div class="container mt-3">
      <h1>Schedule a Pickup</h1>
      <form>
        <Form.Group>
          <Form.Label>Select Date to Schedule</Form.Label>
          <Form.Control
            type="date"
            //value={this.state.date}
            value={this.state.date}
          />
        </Form.Group>
      </form>

      <Row>
        <Col sm="12">
          <div className="ag-theme-balham"
               style={{
                 boxSizing: "border-box",
                 height: "400px",
                 width: "100%"
               }}>
            <AgGridReact
              enableColResize
              // rowSelection={this.state.matterGrid.rowSelection}
              // columnDefs={this.state.matterGrid.columnDefs}
              // statusBar={this.state.matterGrid.statusBar}
              // onRowClicked={this.onMatterGridSelectionChanged}
              // onCellFocused={this.onMatterGridCellFocused}
              // context={this.state.matterGrid.context}
              // frameworkComponents={this.state.matterGrid.frameworkComponents}
              // onGridReady={this.onMatterGridReady}
              // rowData={this.state.matterGrid.rowData}
              // rowBuffer={this.state.matterGrid.rowBuffer}

              // overlayLoadingTemplate={this.state.matterGrid.overlayLoadingTemplate}
              // rowModelType={this.state.matterGrid.rowModelType}
              // paginationPageSize={this.state.matterGrid.paginationPageSize}
              // cacheOverflowSize={this.state.matterGrid.cacheOverflowSize}
              // maxConcurrentDatasourceRequests={this.state.matterGrid.maxConcurrentDatasourceRequests}
              // infiniteInitialRowCount={this.state.matterGrid.infiniteInitialRowCount}
              // maxBlocksInCache={this.state.matterGrid.maxBlocksInCache}
              // cacheBlockSize={this.state.matterGrid.cacheBlockSize}
              // pagination={true}
              // paginationAutoPageSize={true}
            />
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
  

