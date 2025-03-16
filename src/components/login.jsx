import backgroundImage from "../assets/login-background-image.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            
          <div className="col-md-12">
          
            <div className="heading">
              <h1>Balloon Math</h1> <br />
              <h2>LOGIN</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div className="login-fields">
              <h1>username</h1>
              <input type="text" name="enter username " id="username" />
              <h1>password</h1>
              <input type="password" name="enter username " id="password" />

              {/* adding button login */}

              <div class="couche1" id="green1">
    	
    	<div class="couche2" id="green2">

    		<div class="couche23" id="green23">
    	
	    		<div class="couche3" id="green3">
	    	
	    			<div class="couche4" id="green4">

	    				<span class="battle" id="battle_green">Login</span>
	    				
	    				
	    				
	    				
	    	
	    			</div>

	    		</div>

			</div>
    	
    	</div>
 	
    </div>
              <br />
              
    <div class="couche1" id="blue1">
    	
    	<div class="couche2" id="blue2">

    		<div class="couche23" id="blue23">
    	
	    		<div class="couche3" id="blue3">
	    	
	    			<div class="couche4" id="blue4">

	    				<span class="battle" id="battle_blue">Signup</span>
	    				
	    			
	    	
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
  );
}

export default Login;
