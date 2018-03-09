import React, { Component } from 'react';
import Grid from './grid';
import Toolbar from './toolbar'
import Modal from './modal'
//creates a 50 X 50 Grid
export default class Home extends Component {
  constructor(){
    super()
    
    this.state = {
      showModal: false,
    }
    
    this.openModal = this.openModal.bind(this)
  }
  
  openModal(xCoord, yCoord){
    //if(xCoord, yCoord) correspond to a crate
    //set redux state 'current piece' equal to crate
    //set setState
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render(){
    return(
    <div id="homeWrapper">
      {this.state.showModal? <Modal openModal={this.openModal} /> : ''}
      <Toolbar />
      <Grid openModal={this.openModal} />
    </div>
    )
  }
}
