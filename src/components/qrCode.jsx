import React, { Component} from 'react';
import { QRCodeCanvas } from "qrcode.react";
import NavBar from './navBar';


class qrGenerator extends Component {
    state = { 
      data:{
        url: '',
        selectField: ''
      }
     }
     
      
    handleChange = e =>{
      // this.showSpinner()
      const data = {...this.state.data}
      data[e.currentTarget.name] = e.currentTarget.value
      this.setState({data})

      setTimeout(()=>{
        this.hideSpinner()
      },500)
    }
    
    downLoadQrCode = e =>{
        e.preventDefault()
       const canvas = e.currentTarget.querySelector('canvas')
       let image = canvas.toDataURL('image/png')
       let anchor = document.createElement('a')
       anchor.href = image;
       anchor.download = 'qr-code.png'
       document.body.appendChild(anchor)
       anchor.click();
       document.body.removeChild(anchor);
       
    }
    hideSpinner = ()=> {
      document.getElementById('spinner').style.display = 'none'
    }
    showSpinner = ()=> {
      document.getElementById('spinner').style.display = 'block'
    }
  
    render() { 
        return (
             <>
                <NavBar />
<div className='appBody'>
<img src="images/qr1.png" className="img-fluid" alt='' />
<form onSubmit={this.downLoadQrCode}>
  <div className="mb-3">
    
    <input type="url" name='url' value={this.state.data.url} onChange={this.handleChange} className="form-control" id="exampleInputurl" placeholder='Enter your Url'/>
  </div>
  <select className="selectInput" onChange={this.handleChange} value= {this.state.data.selectField} name='selectField' id="name">
    <option selected>Choose...</option>
    <option value="100">100</option>
    <option value="200">200</option>
    <option value="300">300</option>
    <option value="400">400</option>
    <option value="500">500</option>
    <option value="600">600</option>
  </select>
 
  <button type="submit" style={{width: 200, marginLeft: 140}} 
  className="btn btn-info" >Generate QR</button>
</form>
<div id='generatedQR'>
<div className="spinner-border text-primary ml-7" role="status" id='spinner'>
  <span className="visually-hidden">Loading...</span>
</div>
    <QRCodeCanvas
        id="generatedQR"
        value={this.state.data.url}
        size={this.state.data.selectField}
        bgColor={"#58ACFA"}
        level={"H"}
      />
</div>
</div>
            </>
        );
    }
}
 
export default qrGenerator;