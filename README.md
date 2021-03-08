# Quora Question Pairing system
### Mernstack Machine Learning Application

Fullstack web based machine learning application which tells if the two input/selected questions have similar meaning/intent.

#### Features:
* Given two input questions the app predicts if the have same meaning/intent.
* The two input questions will be stored in the MongoDB database.
* The questions in the database will be rendered in the UI.
* Form the given list of questions user can select any two questions and can ask to predict for the same and it will give the response accordingly.

### Technologies used:

Frontend:- React.js and Material UI

Backend: - Nodejs, Express.js, MongoDB

Machine Learning:- Python, Ensemble Learning Algorithms, Data Analysis

#### How this application works:
* On submitting the two input questions it gets stored in the database using the `post()` method.
* Simultaneously those questions gets passed as parameter to the python script.
* Python script on the server processes the input and gives the predicted result.
* The predicted result gets rendered in the UI.
* And the questions in the database fetched from the database using `get()` method to re-render in the UI.
* If the user opts to select any two questions from the rendered list then those selected questions is passed to the server side to process. 
* After processing the result is displayed on the UI.

To run the python script on server side I took the liberty to use Nodejs' `child_process()` method.

