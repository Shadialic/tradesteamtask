
Checkout Form

In this task, I was challenged to build a basic checkout page using the MERN Stack

Frontend:
I created a React component for the checkout form, focusing on simplicity and user experience. The form includes fields for the user's name,contact,email, shipping address, and payment information.
Basic validation was implemented to ensure that all fields are filled out correctly, particularly focusing on the format of the payment information. This ensures that users cannot submit incomplete or incorrect data.
start:npm run dev


Backend:
I set up an Express server with a RESTful API endpoint to handle form submissions, ensuring that the server is ready to process the data sent from the frontend.
A MongoDB database was integrated to store the order details, including user information and the user datails. The backend also includes data validation and error handling to ensure that only valid data is stored.
start:npm start

Integration:

I implemented Stripe as the payment gateway, connecting it to the frontend and backend. Axios was used for API integration to handle the communication between the React frontend and the Express backend.
The successful integration was demonstrated by processing payments and storing the transaction details in MongoDB.

Challenges:
One of the challenges was working with the Stripe payment gateway. Initially, I encountered an issue with the Stripe key, but I was able to resolve it, ensuring secure and smooth payment processing.
I also made sure that Axios was correctly configured for API requests, handling asynchronous operations and managing errors effectively.

This task was an excellent exercise in demonstrating the complete process of building a full-stack feature using the MERN Stack, and I enjoyed the opportunity to integrate various technologies and practices effectively.