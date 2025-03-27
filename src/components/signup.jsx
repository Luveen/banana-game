import {createroot} from 'react-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './signup.css'

function Signup() {
    return(
        <>
         <div className="container-fluid">
            <div className="row">
            <div className="heading">
              <h1>Balloon Math</h1> <br />
              <h2>SIGNUP</h2>
              <br />
            </div>

            <div className="col-md-12">
            <div className="signup-fields justify-content-center">
              <h1>Name</h1>
              <input type="text" name="enter username " id="username" required/>
              <h1>Email</h1>
              <input type="email" name="enter username " id="email" required />
              <h1>password</h1>
              <input type="password" name="enter username " id="password" required/>

              {/* adding button login */}


              <div class="couche1" id="blue1">
                <div class="couche2" id="blue2">
                  <div class="couche23" id="blue23">
                    <div class="couche3" id="blue3">
                      <div class="couche4" id="blue4">
                        <span class="battle" id="battle_blue">
                          Create Account
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            </div>
            </div>
         </div>
        </>
    )
}

export default Signup;
