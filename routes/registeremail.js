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
          <div>We have received your abstract with the title <span style="font-style: italic;">“${user.tOfT}”<span/> for ${user.pType} presentation </div>
          <div>We will send your abstract to the scientific review team‎.<div>
          <br>
          <div>Kindly share the conference information with your colleagues and friends. Your support is highly appreciated.</div>
          <br>  
          <div>For any further assistance, feel free to contact us. </div>
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
  