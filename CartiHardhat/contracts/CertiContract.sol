// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Cert{
    struct Student{
       string name;
       string course;
       string grade;
       string date;
}
event CertificateIssued(string indexed ,uint256,string);


   address admin;
   constructor(){
    admin=msg.sender;
   }

   modifier onlyAdmin(){
    require (msg.sender==admin,"Unauthorised Access");
    _;
   }

   mapping (uint256 => Student) public Certificate;

   function issue(uint256 _id,
     string memory _name ,
     string memory _course,
     string memory _grade,
     string memory _date)
      public onlyAdmin {
        Certificate[_id]=Student(_name,_course,_grade,_date);
                 emit CertificateIssued(_course,_id,_grade);

     }

    function getCert(uint _id) public view returns(uint,string memory,string memory,string memory,string memory){
       Student memory s= Certificate[_id]; 
        return (_id,s.name,s.course,s.grade,s.date); 
    }

 }
