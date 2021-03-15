import React from 'react';
import Axios from 'axios';


class ownerReg extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            phone: '',
            IdProof: '',
            city: '',
            pinCode: '',
            RegDate: new Date()

        }
    }
    // "ownerName": "UpdateFule",
    // "ownerEmail": "email11",
    // "ownerPassword": "root",
    // "ownerPhoneNo": "55555555",
    // "ownerIdProof": "1222",
    // "ownerCity": "ajantha",
    // "ownerPincode": "123456",
    // "ownerRegistDate": null
    
    addOwner() {
        console.log(this.state.email);
        const { name, email, password, phone, IdProof, city, pinCode, RegDate } = this.state;
        Axios.post("http://localhost:8080/realEstate/owner", {
            ownerName: this.state.name, ownerEmail: this.state.email, ownerPassword: this.state.password,
            ownerPhoneNo: this.state.phone, ownerIdProof: this.state.IdProof, ownerCity: this.state.city,
            ownerPincode:this.state.pinCode, ownerRegistDate:this.state.RegDate
        }).then((response) => {
            console.log("new Owner");
            console.log(response.data);
        })
    }



    render() {
        return (
            <>
                <form class="col-lg-6 offset-lg-3 ">  
                    <div className="form-group">
                        <label>Owner Name</label>
                        <input type="email" className="form-control" id="0InputEmail" aria-describedby="emailHelp" 
                                placeholder="FullName" 
                                onChange={(e)=>{this.setState({name :e.target.value})}}
                                />
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" id="name" aria-describedby="name" 
                                placeholder="Email" 
                                onChange={(e)=>{this.setState({email :e.target.value})}}
                                />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" id="city" aria-describedby="city" 
                                placeholder="Password" 
                                onChange={(e)=>{this.setState({password : e.target.value})}}
                                />
                    </div>

                    <div className="form-group">
                        <label>PhoneNumber</label>
                        <input type="text" className="form-control" id="InputPassword" placeholder="PhoneNo"
                                onChange={(e)=>{this.setState({phone : e.target.value})}}
                                />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" id="InputPassword" placeholder="City"
                                onChange={(e)=>{this.setState({city : e.target.value})}}
                                />
                    </div>
                    <div className="form-group">
                        <label>PinCode</label>
                        <input type="text" className="form-control" id="InputPassword" placeholder="PinCode"
                                onChange={(e)=>{this.setState({pinCode : e.target.value})}}
                                />
                    </div>

                    
                    <div className='row'>
                        <div className='col-md-10'>
                            <div className='col-md-1'>
                                <button type="submit" className="btn btn-primary"
                                    onClick={()=>this.addOwner()}
                                    >
                                    Register</button>
                            </div>
                        </div>
                    </div>
            </form>
            </>
        )
    }
}

export default ownerReg;