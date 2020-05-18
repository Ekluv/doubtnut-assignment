For installation Checkout this repo, install dependencies, then start the gulp process with the following:

## Prerequisite
    > node
    > mongo

## Install Mongo
    > brew install mongodb
    > brew services restart mongo (if not started automatically)

## Start Server
    > npm install
    > npm start

### Fake Email service is used so the receiver will not actually receive email
### Emails will be intercepted and can be seen by login into https://ethereal.email with following creds
    user: "lela.stehr@ethereal.email",
    pass: "A6khEfU4CaKKnS4pEs",


## Steps to run:
    1. HTTP Request to find or create user
        curl --location --request POST 'http://localhost:3000/api/v1/user/find_or_create' \
        --header 'Content-Type: application/json' \
        --data-raw '{"email": "useremail@email.com"}'

        It will return JWT token

    2. Copy token and send another request - 
    curl --location --request POST 'http://localhost:3000/api/v1/ask_question' \
    --header 'Authorization: JWT <YOUR_TOKEN>' \
    --header 'Content-Type: application/json' \
    --data-raw '{"question": "1+1 = ?"}'

    3. User will receive email with attachment link after inactivity of 5 mins
    If a new request is received on 'http://localhost:3000/api/v1/ask_question' then the latest request will be served and PDF of the
    latest request will be sent to the user

