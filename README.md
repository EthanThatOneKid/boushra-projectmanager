# 📩 ProMake 

## Description
Currently working on a fun small manager and employee project with all my learning of JS so far and a bit of Express using JSON files. The point of this small web application is to test out everything from my learning and although it may not be perfect, it is a learning experience for me. 

## How it Will Work
Managers or Companies or even FreeLancers and sign in and they will automatically be given data similar to this:
```json 
[
  {"companyName":"Company1","passcode":"c3LQyu","id":"3787131387"}
]
```
Then, they will be redirected and are able to add employees and projects( projects can only be added if there are employees ) dependent on their unique ID with the following data:

--> Employee:
 ```json
 [
  {"employee":"boushra bettir","position":"ai developer","status":"currently working","id":"5609668256"}
 ]
 ```
--> Company: 
```json
[
  {"project":"data analytics","name":"boushra bettir","money":"34","desc":"this is about project 2","id":1677724351685,"date":"3/1/2023"}
]
```

With this, companies are able to view all employees, add tasks (currently being worked on) and track how tasks are doing (currently being worked on), and so much more.

Employees also have their own information logging in as well. I am still working on this part, but the usernames are automatically given like the following:
```json
[
  {"employee_name":"sarah wilson","company_code":"3787131387","username":"sw","id":"088468787790"}
]
```
With obvious reasons, this can cause complications if 2 employees under the same company have the same username, however I plan to change this. This was made simply for testing.
Employees will be given their custom homepage and be able to track all employee projects under their company as well as add their own projects.

## Planning to Do
There are several things I plan to do to finish this as quickly as possible. I plan to make this a simple tool for learning purposes only. 

## Photos
<img width="1425" alt="Screen Shot 2023-03-05 at 10 00 15 PM" src="https://user-images.githubusercontent.com/116927138/223030752-0ea0025a-4427-4565-b211-7cfe84341f90.png">
<img width="1432" alt="Screen Shot 2023-03-05 at 10 00 45 PM" src="https://user-images.githubusercontent.com/116927138/223030841-0063290a-5cf0-4517-9910-be3778dde132.png">
<img width="1438" alt="Screen Shot 2023-03-05 at 10 01 02 PM" src="https://user-images.githubusercontent.com/116927138/223030877-6ccdd2aa-572c-40d2-a52a-745e9f200bd3.png">
<img width="1431" alt="Screen Shot 2023-03-05 at 10 01 48 PM" src="https://user-images.githubusercontent.com/116927138/223030968-dbcd1b5a-f747-48fa-9c59-cd9587910b9e.png">
