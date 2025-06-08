import chalk from 'chalk';
import {contObjct} from './instans.js';

(()=>{
    console.log(chalk.magenta('Listening for Issue Events...'));
    // console.log(contObjct);
    
    contObjct.on("CertificateIssued",(course,id,grade,event)=>{
        console.log(chalk.bgGreen("**** Event Occured ****"));
        console.log('course :',course);
        console.log("id :",id);
        console.log("grade :",grade);
        console.log("events :",event);
             
    })
    
})();