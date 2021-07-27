import { Form, FormGroup, Modal } from "react-bootstrap";
import './Schedule.css';
import { Row, Col, Button } from 'reactstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { Component } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class Schedule extends Component {
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
    this.setState({ date: document.getElementById("datePicker").value });
    debugger;
  }

  getInitialState = () => {
    var defaultDate = new Date();
    var defaultDateString = this.formatDate(defaultDate);
    return {
      date: defaultDateString,
      isScheduleModalVisible: false
    };
  }

  clickAddSchedule = () => {
      this.setState({isScheduleModalVisible: true});
  }

  render() {
    return (
      <div>
        <div class="container mt-3 mb-3">
          <h1>Schedule a Pickup</h1>
          <form>
            <Form.Group>
              <Form.Label>Select Date to Schedule</Form.Label>
              <Form.Control
                id="datePicker"
                type="date"
                onChange={this.onChangeDate}
                //value={this.state.date}
                value={this.state.date}
              />
            </Form.Group>
          </form>
          <div class="row">
            <div class="col-sm-3">
              <p><button class="btn btn-primary btn-block" onClick={this.clickAddSchedule}>Add Schedule</button></p>
              <p><button class="btn btn-primary btn-block">Edit Shedule</button></p>
              <p><button class="btn btn-primary btn-block">Delete Shedule</button></p>
            </div>
          </div>
          <Row>
            <Col sm="12">
              <div className="ag-theme-alpine"
                style={{
                  boxSizing: "border-box",
                  height: "475px",
                  width: "100%"
                }}>
                <AgGridReact
                  style={{ width: "100px" }}
                  //containerStyle={{height: "200px"}}
                  rowData={[
                    { scheduledItem: "Delivery to Michael" },
                    { scheduledItem: "Delivery to John" },
                    { scheduledItem: "Delivery to Mary" },
                    { scheduledItem: "Delivery to Michael" },
                    { scheduledItem: "Delivery to John" },
                    { scheduledItem: "Delivery to Mary" },
                    { scheduledItem: "Delivery to Michael" },
                    { scheduledItem: "Delivery to John" },
                    { scheduledItem: "Delivery to Mary" }
                  ]}>
                  <AgGridColumn field="scheduledItem" width={1100}></AgGridColumn>
                </AgGridReact>
              </div>
            </Col>
          </Row>
        </div>

        <Modal show={this.state.isScheduleModalVisible}>
                  test
        </Modal>
                  

     

        {/* <ModalBoxRenderer
            isOpen={this.state.viewModalVisible}
          // onClose={this.onCloseViewCalculationModal}
           className="modal-lg"
           modalCancelButtonText="Close"
           showSavedButton="Save"
           modalTitle="Calculation"
          // onClickSaveChanges={this.onCloseViewCalculationModal.bind(this)}
          // onClickCancelChanges={this.onCloseViewCalculationModal.bind(this)}>
        
           //{this.showCalculationModal()}
           >
        </ModalBoxRenderer> */}
      </div>
    );
  }
}

export default Schedule;