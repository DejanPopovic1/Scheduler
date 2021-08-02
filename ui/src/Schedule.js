import { Form, FormGroup, Modal } from "react-bootstrap";
import './Schedule.css';
import { Row, Col, Button } from 'reactstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import { Component, useEffect } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import MainMap from './MainMap';
import './styles.css';

class Schedule extends Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = this.getInitialState();
    //If the line below is not included, then getData wont bind to the state variables
    this.getData = this.getData.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate = () => {
    var test = "test";
    var test2 = this.state.scheduledItemsArray;
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
    this.setState({ date: document.getElementById("datePicker").value });
  }

  onChangeScheduleName = () => {
    this.setState({ scheduleName: document.getElementById("scheduleName").value });
  }

  getInitialState = () => {
    var defaultDate = new Date();
    var defaultDateString = this.formatDate(defaultDate);
    return {
      //Form Data
      date: defaultDateString,
      scheduleName: "",
      scheduledItemsArray: [
        {scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Michaelz"},
        {scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to John"},
        {scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Mary"},
        {scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Zed"},
        {scheduledDate: new Date(), scheduledLat: 31.22, scheduledLng: 31.22, scheduledItem: "Delivery to Craig"}
      ],
      //Control Information
      isScheduleModalVisible: false,
      //Child Data Passed Back
      lat: 0,
      lng:0,
    };
  }

  getData(lati, lngi){
    // do not forget to bind getData in constructor

    this.setState({lat: lati});
    this.setState({lng: lngi});
    console.log(this.state.lat, this.state.lng);

  }

  addPickupPoint = () => {
    this.setState({isScheduleModalVisible: true});

      
      // var map = new google.maps.Map(document.getElementById("map"), {
      //   center: {lat: -34.397, lng: 150.644},
      //   zoom: 8
      // });
  }
    
  addToItemArray = () => {
    var scheduledDate = new Date();
    var scheduledItem = document.getElementById("scheduleName").value;
    var scheduledLat= this.state.lat;
    var scheduledLng = this.state.lng;
    var newObject = {scheduledDate, scheduledLat, scheduledLng, scheduledItem};


    ////this.setState({ scheduleName: document.getElementById("scheduleName").value });
    var joinedObjList = this.state.scheduledItemsArray.concat(newObject);
    this.setState({scheduledItemsArray : joinedObjList});


    // var myObj = {scheduledItem: document.getElementById("scheduleName").value};
    // var joined = this.state.scheduledItemsArray.concat(newObject);
    // this.setState({scheduledItemsArray : joined});


  }
  
  closeModal = () => {
    this.setState({isScheduleModalVisible: false});

      
      // var map = new google.maps.Map(document.getElementById("map"), {
      //   center: {lat: -34.397, lng: 150.644},
      //   zoom: 8
      // });
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
                value={this.state.date}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Schedule Name</Form.Label>
              <Form.Control
                id="scheduleName"
                type="input"
                onChange={this.onChangeScheduleName}
                value={this.state.scheduleName}
              />
            </Form.Group>
          </form>
          <div class="row">
            <div class="col-sm-3">
            <Form.Label>Add Pickup Point</Form.Label>
              <p><button class="btn btn-primary btn-block" onClick={this.addPickupPoint}>Add Pickup Point</button></p>
              <p><button class="btn btn-secondary btn-block" onClick={this.addToItemArray}>Add Shedule</button></p>
              <p><button class="btn btn-secondary btn-block">Edit Shedule</button></p>
              <p><button class="btn btn-secondary btn-block">Delete Shedule</button></p>
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
                  rowData={this.state.scheduledItemsArray}>
                  <AgGridColumn field="scheduledDate" width={300}></AgGridColumn>
                  <AgGridColumn field="scheduledItem" width={300}></AgGridColumn>
                  <AgGridColumn field="scheduledLat" width={300}></AgGridColumn>
                  <AgGridColumn field="scheduledLng" width={300}></AgGridColumn>


                </AgGridReact>
              </div>
            </Col>
          </Row>
        </div>
        
        
        <Modal show={this.state.isScheduleModalVisible} contentClassName="custom-modal-style">
          <h1 className="text-center">Add Pickup Point</h1>
          <h4 className="text-center"><i>Click on the map to select a pickup point</i></h4>


          <div>
            <Button className='m-1 btn' color="primary" onClick = {this.closeModal}>Confirm Pickup Point</Button>
            <Button className='m-1 btn-primary' color="primary" onClick = {this.closeModal}>Cancel</Button>
            <MainMap sendData={this.getData}></MainMap>
          </div>
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