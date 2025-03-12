// Create a popup authentication window for sign in, sign up and password reset

document.addEventListener('DOMContentLoaded', function() {
    // Get the login button and add click event listener
    const loginBtn = document.querySelector('.login-btn');
    
    if (loginBtn) {
      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openAuthPopup();
      });
    }
  
    // Function to open the authentication popup
    function openAuthPopup() {
      // Create the popup overlay
      const overlay = document.createElement('div');
      overlay.className = 'auth-overlay';
      
      // Create the popup content
      const popup = document.createElement('div');
      popup.className = 'auth-popup';
      
      // Add the HTML for the popup
      popup.innerHTML = `
        <div class="auth-popup-content">
          <button class="auth-close-btn">&times;</button>
          
          <div class="auth-tabs">
            <button class="auth-tab-btn active" data-tab="signin">Sign In</button>
            <button class="auth-tab-btn" data-tab="signup">Sign Up</button>
          </div>
          
          <div class="auth-forms">
            <!-- Sign In Form -->
            <form id="signin-form" class="auth-form active">
              <div class="auth-form-header">
                <span class="auth-chip">Welcome Back</span>
                <h2>Sign in to your account</h2>
              </div>
              
              <div class="auth-input-group">
                <label for="signin-email">Email</label>
                <div class="auth-input-wrapper">
                  <input type="email" id="signin-email" required>
                </div>
              </div>
              
              <div class="auth-input-group">
                <label for="signin-password">Password</label>
                <div class="auth-input-wrapper">
                  <input type="password" id="signin-password" required>
                </div>
              </div>
              
              <div class="auth-remember-forgot">
                <div class="auth-remember">
                  <input type="checkbox" id="remember-me">
                  <label for="remember-me">Remember me</label>
                </div>
                <button type="button" class="auth-forgot-btn" id="forgot-password">Forgot password?</button>
              </div>
              
              <button type="submit" class="auth-submit-btn">Sign In</button>
            </form>
            
            <!-- Sign Up Form -->
            <form id="signup-form" class="auth-form">
              <div class="auth-form-header">
                <span class="auth-chip">Create Account</span>
                <h2>Join SportsBook today</h2>
              </div>
              
              <div class="auth-input-group">
                <label for="signup-name">Full Name</label>
                <div class="auth-input-wrapper">
                  <input type="text" id="signup-name" required>
                </div>
              </div>
              
              <div class="auth-input-group">
                <label for="signup-email">Email</label>
                <div class="auth-input-wrapper">
                  <input type="email" id="signup-email" required>
                </div>
              </div>
              
              <div class="auth-input-group">
                <label for="signup-password">Password</label>
                <div class="auth-input-wrapper">
                  <input type="password" id="signup-password" required>
                </div>
              </div>
              
              <div class="auth-input-group">
                <label for="signup-confirm-password">Confirm Password</label>
                <div class="auth-input-wrapper">
                  <input type="password" id="signup-confirm-password" required>
                </div>
              </div>
              
              <div class="auth-terms">
                <input type="checkbox" id="terms" required>
                <label for="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
              </div>
              
              <button type="submit" class="auth-submit-btn">Create Account</button>
            </form>
            
            <!-- Forgot Password Form -->
            <form id="forgot-form" class="auth-form">
              <div class="auth-form-header">
                <span class="auth-chip">Reset Password</span>
                <h2>Recover your account</h2>
                <p>Enter your email and we'll send you a link to reset your password</p>
              </div>
              
              <div class="auth-input-group">
                <label for="forgot-email">Email</label>
                <div class="auth-input-wrapper">
                  <input type="email" id="forgot-email" required>
                </div>
              </div>
              
              <button type="submit" class="auth-submit-btn">Send Reset Link</button>
              
              <button type="button" class="auth-back-btn" id="back-to-signin">Back to Sign In</button>
            </form>
          </div>
        </div>
      `;
      
      // Append the popup to the body
      document.body.appendChild(overlay);
      document.body.appendChild(popup);
      
      // Prevent body scrolling when popup is open
      document.body.style.overflow = 'hidden';
      
      // Add animation classes after a small delay to trigger transitions
      setTimeout(() => {
        overlay.classList.add('active');
        popup.classList.add('active');
      }, 10);
      
      // Handle tab switching
      const tabBtns = popup.querySelectorAll('.auth-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          // Remove active class from all tabs and forms
          tabBtns.forEach(b => b.classList.remove('active'));
          popup.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
          
          // Add active class to clicked tab and corresponding form
          this.classList.add('active');
          const tabName = this.getAttribute('data-tab');
          document.getElementById(`${tabName}-form`).classList.add('active');
        });
      });
      
      // Handle forgot password button
      const forgotBtn = popup.querySelector('#forgot-password');
      forgotBtn.addEventListener('click', function() {
        popup.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById('forgot-form').classList.add('active');
      });
      
      // Handle back to sign in button
      const backBtn = popup.querySelector('#back-to-signin');
      backBtn.addEventListener('click', function() {
        popup.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById('signin-form').classList.add('active');
        
        // Activate sign in tab
        tabBtns.forEach(b => b.classList.remove('active'));
        popup.querySelector('[data-tab="signin"]').classList.add('active');
      });
      
      // Handle close button
      const closeBtn = popup.querySelector('.auth-close-btn');
      closeBtn.addEventListener('click', closeAuthPopup);
      
      // Close popup when clicking on overlay
      overlay.addEventListener('click', closeAuthPopup);
      
      // Prevent popup from closing when clicking on popup content
      popup.addEventListener('click', function(e) {
        e.stopPropagation();
      });
      
      // Handle form submissions (placeholder for actual authentication)
      const forms = popup.querySelectorAll('.auth-form');
      forms.forEach(form => {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          // You would add actual authentication logic here
          console.log('Form submitted:', this.id);
          // For demo purposes, close the popup after submission
          closeAuthPopup();
        });
      });
      
      // Function to close the authentication popup
      function closeAuthPopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
        
        // Allow a small delay for exit animations before removing elements
        setTimeout(() => {
          document.body.removeChild(overlay);
          document.body.removeChild(popup);
          document.body.style.overflow = '';
        }, 300);
      }
    }
  });
  