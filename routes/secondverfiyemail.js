module.exports = (user,emailData) => {
  return`
  <!doctype html>
  <html>
     <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
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
          <div>Dear ${user.title} ${user.fname}</div>
          <div>Greetings</div>
          <div>We hope you are doing well.</div>
          <br>
          <div>We are glad to inform you that our team has verified your payment receipt. To download your acceptance letter, please log in to the conference website using your username and password. </div>
          <br>
          <div>Welcome to The ${emailData.conf} International Conference on New Horizons in Basic and Applied Science(ICNHBAS${emailData.year}) </div>
          <br>
          <div>We are looking forwards to meet you.</div>
          <br>
          <div>For any further assistance please feel free to contact me, We would be happy to assist you.</div>
          <br>
          <br>
          <div>Thank you</div>
          <div>${emailData.emailName}</div>
          <br>
          <div>Conference Chairman</div>
      </div>
  </body>
  </html>
  `;
  };
  