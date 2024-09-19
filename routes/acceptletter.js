module.exports = (logged,emailData) => {
  const data=logged
  const currentYear = emailData.year
  const offset = 2 
  var d = new Date();
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  var today = new Date(utc + (3600000*offset));
  let coAuthors=['','','','','','']
  const coAuthorss = data.co_authors.split('--')
  coAuthors[0]=coAuthorss[0] ? coAuthorss[0] : ''
  coAuthors[1]=coAuthorss[1] ? coAuthorss[1] : ''
  coAuthors[2]=coAuthorss[2] ? coAuthorss[2] : ''
  coAuthors[3]=coAuthorss[3] ? coAuthorss[3] : ''
  coAuthors[4]=coAuthorss[4] ? coAuthorss[4] : ''
  coAuthors[5]=coAuthorss[5] ? coAuthorss[5] : ''
  console.log(logged.participation_type)
  if(logged.abstract === 'Not Send'){
   return `
   <!doctype html>
       <html>
          <head>
             <meta charset="utf-8">
             <title>Acceptance Letter</title>
             <style>
               table, th, td {
               border: 1px solid black;
               text-align: center;
               }
               td{
                  padding: 0.5rem 0;
               }
               .container,
               .container-fluid,
               .container-xxl,
               .container-xl,
               .container-lg,
               .container-md,
               .container-sm {
               width: 100%;
               margin-right: auto;
               margin-left: auto;
               }
   
               @media (min-width: 576px) {
               .container-sm, .container {
                  max-width: 540px;
               }
               }
               @media (min-width: 768px) {
               .container-md, .container-sm, .container {
                  max-width: 720px;
               }
               }
               @media (min-width: 992px) {
               .container-lg, .container-md, .container-sm, .container {
                  max-width: 960px;
               }
               }
               @media (min-width: 1200px) {
               .container-xl, .container-lg, .container-md, .container-sm, .container {
                  max-width: 1140px;
               }
               }
               @media (min-width: 1400px) {
               .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
                  max-width: 1320px;
               }
               }
               .row {
                  display: -webkit-box;
                  display: -webkit-flex;
                  -webkit-flex-wrap: wrap;
                  display: flex;
                  flex-wrap: wrap;
               }
               .row > * {
               box-sizing: border-box;
               flex-shrink: 0;
               width: 100%;
               max-width: 100%;
               }
   
               .col {
               flex: 1 0 0%;
               }
   
   
               .col-auto {
               flex: 0 0 auto;
               width: auto;
               }
   
               .col-1 {
               flex: 0 0 auto;
               width: 8.3333333333%;
               }
   
               .col-2 {
               flex: 0 0 auto;
               width: 16.6666666667%;
               }
   
               .col-3 {
               flex: 0 0 auto;
               width: 25%;
               }
   
               .col-4 {
               flex: 0 0 auto;
               width: 33.3333333333%;
               }
   
               .col-5 {
               flex: 0 0 auto;
               width: 41.6666666667%;
               }
   
               .col-6 {
               flex: 0 0 auto;
               width: 50%;
               }
   
               .col-7 {
               flex: 0 0 auto;
               width: 58.3333333333%;
               }
   
               .col-8 {
               flex: 0 0 auto;
               width: 66.6666666667%;
               }
   
               .col-9 {
               flex: 0 0 auto;
               width: 75%;
               }
   
               .col-10 {
               flex: 0 0 auto;
               width: 83.3333333333%;
               }
   
               .col-11 {
               flex: 0 0 auto;
               width: 91.6666666667%;
               }
   
               .col-12 {
               flex: 0 0 auto;
               width: 100%;
               }
         </style>          
          </head>
          <body style="font-size: 15px">
            <div style="border-bottom: 1px solid;padding: 1rem;" class="container">
              <div style="text-align: center;" class="row mt-4">
                 <div class="col-3">
                    <img height="75" width="75" src="https://i.imgur.com/RTqSUXX.jpg" />
                 </div>
                 <div style="margin-top:10px;" class="col-5">
                    <img height="50" width="180" src="https://imgur.com/UBObchf.png" />
                 </div>
                 <div class="col-3">
                    <img height="75" width="75" src="https://imgur.com/MqbEYzf.png" />                  
                 </div>                                 
              </div>
              <div class="row">
                 <div class="col-12">
                    <h1 style="text-align: center;">Acceptance Letter</h1>
                 </div>
                 <div class="col-12">
                    <div>Dear ${data.title} ${data.fname}</div>
                    <div>On behalf of the ICNHBAS${currentYear} Organizing Committee, we are pleased to inform you that your registration has been completed</div>
                 </div>

                 <div style="margin: 1rem 0;" class="row">
                    <div style="text-align:center ;margin: 1rem;" >Looking forward to seeing you in ICNHBAS${currentYear}</div>
                    <div style="text-align:center ;" >With best regards</div>     
                 </div>
                                      <div class="mt-5 row">
                        <div style="text-align: center;" class="col-4">
                           <div>Chairman of the ICNHBAS${currentYear}</div>
                           <div><img height="40px" width="170px" src='${emailData.LetterImageA}' /></div>
                           <div>${emailData.LetterNameA}</div>
                        </div>
                        <div style="text-align: center;" class="col-4">
                           <div><img height="80px" width="80px" src='${emailData.stamp}' /></div>
                        </div>                         
                        <div style="text-align: center;"  class="col-4">
                           <div>Coordinator of the ICNHBAS${currentYear}</div>
                           <div><img height="40px" width="170px" src='${emailData.LetterImageB}' /></div>
                           <div>${emailData.LetterNameB}</div>
                        </div>
                     </div>
                     <div class="row mt-5" >
                        <div class="col-6">
                           Date :${`${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`}
                        </div>
                        <div class="col-6">
                           <div style="margin-left: 10rem;">Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style="margin-top: 1rem;" class="container">
                  <div class="row">
                     <div class="col-9">
                        <div>Webiste :<a href="https://www.icnhbas.com/">https://www.icnhbas.com/ </a> </div>
                        <div>E–mail : info@nhbas.com</div>
                     </div>
                     <div class="col-3">
                        <div>Tel:  +20882148094 </div>
                        <div>Fax:  +20882148093 </div>
                        <div>Phone:  +201118009916 </div>
                        <div>Phone:  +201002316117 </div>                        
                     </div>
                  </div>
               </div>
         </body>
      </html>
     `;       
  }else{
      return `
      <!doctype html>
         <html>
            <head>
               <meta charset="utf-8">
               <title>Acceptance Letter</title>
               <style>
                  table, th, td {
                  border: 1px solid black;
                  text-align: center;
                  }
                  td{
                     padding: 0.5rem 0;
                     height:18px;
                     width:45px;
                     font-size:12;
                  }
                  .container,
                  .container-fluid,
                  .container-xxl,
                  .container-xl,
                  .container-lg,
                  .container-md,
                  .container-sm {
                  width: 100%;
                  margin-right: auto;
                  margin-left: auto;
                  }
                  .row {
                     display: -webkit-box;
                     display: -webkit-flex;
                     -webkit-flex-wrap: wrap;
                     display: flex;
                     flex-wrap: wrap;
                  }
                  .row > * {
                  box-sizing: border-box;
                  flex-shrink: 0;
                  width: 100%;
                  max-width: 100%;
                  }
      
                  .col {
                  flex: 1 0 0%;
                  }
      
      
                  .col-auto {
                  flex: 0 0 auto;
                  width: auto;
                  }
      
                  .col-1 {
                  flex: 0 0 auto;
                  width: 8.3333333333%;
                  }
      
                  .col-2 {
                  flex: 0 0 auto;
                  width: 16.6666666667%;
                  }
      
                  .col-3 {
                  flex: 0 0 auto;
                  width: 25%;
                  }
      
                  .col-4 {
                  flex: 0 0 auto;
                  width: 33.3333333333%;
                  }
      
                  .col-5 {
                  flex: 0 0 auto;
                  width: 41.6666666667%;
                  }
      
                  .col-6 {
                  flex: 0 0 auto;
                  width: 50%;
                  }
      
                  .col-7 {
                  flex: 0 0 auto;
                  width: 58.3333333333%;
                  }
      
                  .col-8 {
                  flex: 0 0 auto;
                  width: 66.6666666667%;
                  }
      
                  .col-9 {
                  flex: 0 0 auto;
                  width: 75%;
                  }
      
                  .col-10 {
                  flex: 0 0 auto;
                  width: 83.3333333333%;
                  }
      
                  .col-11 {
                  flex: 0 0 auto;
                  width: 91.6666666667%;
                  }
      
                  .col-12 {
                  flex: 0 0 auto;
                  width: 100%;
                  }
            </style>          
            </head>
            <body style="font-size: 14px">
               <div style="border-bottom: 1px solid;padding: 1rem;" class="container">
                  <div style="text-align: center;" class="row mt-4">
                     <div class="col-3">
                        <img height="75" width="75" src="https://i.imgur.com/RTqSUXX.jpg" />
                     </div>
                     <div style="margin-top:10px;" class="col-5">
                        <img height="50" width="180" src="https://imgur.com/UBObchf.png" />
                     </div>
                     <div class="col-3">
                        <img height="75" width="75" src="https://imgur.com/MqbEYzf.png" />                  
                     </div>                                 
                  </div>
                  <div class="row">
                     <div class="col-12">
                        <h1 style="text-align: center;">Acceptance Letter</h1>
                     </div>
                     <div class="col-12">
                        <div>Dear ${data.title} ${data.fname}</div>
                        <div>On behalf of the ICNHBAS${currentYear} Organizing Committee, we are pleased to inform you that your submitted abstract entitled:</div>
                     </div>
                     <div class="col-12">
                        <div style="text-align: center;margin: 1rem 0;margin-right:2rem;font-weight: bold;">${data.title_of_talks}</div>
                     </div>
                     <div class="row">
                        <div class="col-2">Co-Authors:</div>
                        <div class="col-8">
                           <table style="width:100%">
                              <tr>
                                 <td>${coAuthors[0]}</td>
                                 <td>${coAuthors[1]}</td>
                              </tr>
                              <tr>
                                 <td>${coAuthors[2]}</td>
                                 <td>${coAuthors[3]}</td>
                              </tr>
                              <tr>
                                 <td>${coAuthors[4]}</td>
                                 <td>${coAuthors[5]}</td>
                              </tr>
                           </table>
                        </div>
                        <div class="col-2"></div>                        
                     </div>
                     <div style="margin-top: 1rem ;margin-bottom:1rem" class="row">
                        <div style="margin-right:2rem;" class="col-12">
                           <div>Has been accepted for ${data.participation_type} Presentation at ${emailData.conf} International Conference on New Horizons in Basic and Applied Sciences In Hurghada (ICNHBAS2021) and will appear in the conference publications which will be available to the participants at the conference.</div>
                           <div style="text-align:center ;margin: 1rem;" >Looking forward to seeing you in ICNHBAS${currentYear}</div>
                           <div style="text-align:center ;" >With best regards</div>     
                        </div>
                     </div>
                     <div class="mt-5 row">
                        <div style="text-align: center;" class="col-4">
                           <div>Chairman of the ICNHBAS${currentYear}</div>
                           <div><img height="40px" width="170px" src='${emailData.LetterImageA}' /></div>
                           <div>${emailData.LetterNameA}</div>
                        </div>
                        <div style="text-align: center;" class="col-4">
                           <div><img height="80px" width="80px" src='${emailData.stamp}' /></div>
                        </div>                         
                        <div style="text-align: center;margin-left:-2rem;"  class="col-4">
                           <div>Coordinator of the ICNHBAS${currentYear}</div>
                           <div><img height="40px" width="170px" src='${emailData.LetterImageB}' /></div>
                           <div>${emailData.LetterNameB}</div>
                        </div>
                     </div>
                     <div class="row mt-5" >
                        <div class="col-5">
                           Date :${`${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`}
                        </div>
                        <div class="col-6">
                           <div style="margin-left: 10rem;">Time ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}</div>
                        </div>
                     </div>
                  </div>
               </div>
               <div style="margin-top: 1rem;" class="container">
                  <div class="row">
                     <div class="col-9">
                        <div>Webiste :<a href="https://www.icnhbas.com/">https://www.icnhbas.com/ </a> </div>
                        <div>E–mail : info@nhbas.com</div>
                     </div>
                     <div class="col-3">
                        <div>Tel:  +20882148094 </div>
                        <div>Fax:  +20882148093 </div>
                        <div>Phone:  +201118009916 </div>
                        <div>Phone:  +201002316117 </div>                        
                     </div>
                  </div>
               </div>
            </body>
         </html>
         `;        
  }

};