/**
 * This script handles the login functionality for the Recipe Management Application.
 * It manages user authentication by sending login requests to the server and handling responses.
*/
const BASE_URL = "http://localhost:8081"; // backend URL

/* 
 * TODO: Get references to DOM elements
 * - username input
 * - password input
 * - login button
 * - logout button (optional, for token testing)
 */
let usernameField = document.getElementById("login-input");
let passwordField = document.getElementById("password-input");
let loginButton = document.getElementById("login-button");
let logoutButton = document.getElementById("logout-button");

/* 
 * TODO: Add click event listener to login button
 * - Call processLogin on click
 */
loginButton.addEventListener('click', processLogin);

/**
 * TODO: Process Login Function
 * 
 * Requirements:
 * - Retrieve values from username and password input fields
 * - Construct a request body with { username, password }
 * - Configure request options for fetch (POST, JSON headers)
 * - Send request to /login endpoint
 * - Handle responses:
 *    - If 200: extract token and isAdmin from response text
 *      - Store both in sessionStorage
 *      - Redirect to recipe-page.html
 *    - If 401: alert user about incorrect login
 *    - For others: show generic alert
 * - Add try/catch to handle fetch/network errors
 * 
 * Hints:
 * - Use fetch with POST method and JSON body
 * - Use sessionStorage.setItem("key", value) to store auth token and admin flag
 * - Use `window.location.href` for redirection
 */
async function processLogin() {
    // TODO: Retrieve username and password from input fields
    // - Trim input and validate that neither is empty
    let username = usernameField.value.trim();
    let password = passwordField.value.trim();

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // TODO: Create a requestBody object with username and password
    const requestBody = {
        username: username,
        password: password
    };

    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(requestBody)
    };

    try {
        // TODO: Send POST request to http://localhost:8081/login using fetch with requestOptions
        let HTTPResponse = await fetch("http://localhost:8081/login", requestOptions);

        // TODO: If response status is 200
        // - Read the response as text
        // - Response will be a space-separated string: "token123 true"
        // - Split the string into token and isAdmin flag
        // - Store both in sessionStorage using sessionStorage.setItem()
        if (HTTPResponse.status === 200) {
            let textData = await HTTPResponse.text();
            let splitData = textData.split(" ");
            sessionStorage.setItem("auth-token", splitData[0]);
            sessionStorage.setItem("is-admin", splitData[1]);
        
            // TODO: Optionally show the logout button if applicable
            if (logoutButton.hidden) {
                logoutButton.hidden = false;
            }

            // TODO: Add a small delay (e.g., 500ms) using setTimeout before redirecting
            // - Use window.location.href to redirect to the recipe page
            setTimeout(() => {
                window.location.href = "../recipe/recipe-page.html";
            }, 500);
        }
        // TODO: If response status is 401
        // - Alert the user with "Incorrect login!"
        else if (HTTPResponse.status === 401) {
            throw new Error("Incorrect login!");
        }
        // TODO: For any other status code
        // - Alert the user with a generic error like "Unknown issue!"
        else {
            throw new Error("Unknown issue!");
        }

    } catch (error) {
        // TODO: Handle any network or unexpected errors
        // - Log the error and alert the user
        console.log(error.message);
        alert("Error Message: " + error.message);
    }
}

