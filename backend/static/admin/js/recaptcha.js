
  <script src="https://www.google.com/recaptcha/api.js?render=6LepT_oUAAAAAN-7cCVGD-gkG0U-jdOG8L8J4yqd"></script>
<script>
  // 3
  grecaptcha.ready(function() {
      // 4
      document.getElementById('contactform').submit(function(e){
          var form = this;
          // 5
          e.preventDefault()
          grecaptcha.execute('reCAPTCHA_site_key', {action: 'signupform'}).then(function(token) {
              // 6
              document.getElementById('recaptcha').setAttribute('value',token)
              // 7
              form.submit()
          });
      })
  });
  </script>