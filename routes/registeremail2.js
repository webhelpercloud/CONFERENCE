module.exports = (user) => {
  return`
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>Register Email</title>
        <style>
          table, th, td {
          border: 1px solid black;
          text-align: center;
          }
          .container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          }
          .left-col{
            font-weight: bold;
            padding: 1rem;
          }
          .right-col{
            padding: 1rem;   
          }
    </style>          
    </head>
    <body style="font-size: 20px">
      <div style="margin-top:5rem" class="container">
          <div>Dear ${user.title} ${user.fName}</div>
          <div>Greetings</div>
          <div>We hope you are doing well.</div>          
          <br>
          <div>Thank you for your interest in our International Conference on New Horizons in Basic and Applied Science (ICNHBAS${user.emailYear})</div>
          <br>
          <div>We are very much delighted to have your presence in this esteemed event</div>
          <div>To secure your slot, please complete your payment process to receive your acceptance letter.</div> 
          <div>The payment is acceptable, either cash or bank transfer. Please refer to the bank account details at </div>
          <div>https://www.icnhbas.com/fees</div>
          <br>
          <br>   
          <div>Kindly send us a scanned copy of the fees payment receipt as soon as possible.</div>
          <br>
          <div>You may upload it here https://www.icnhbas.com/myaccount/verification</div>
          <div>Or send it to the following E–mail address: info@nhbas.com or icnhbas.azhar@gmail.com.</div>
          <br>  
          <br>
          <div>Kindly suggest your colleagues and friends participate in our conference. We appreciate your support in advance</div>
          <br>
          <div>For any further assistance, please feel free to contact us. We would be happy to assist you.</div>
          <div>We are looking forward to seeing you in Hurghada.</div>
          <br>
          <br>
          <div>Thank you</div>
          <div>${user.emailName}</div>
          <br>
          <div>Conference Chairman</div>

      </div>
  </body>
  </html>
  `;
  };
  