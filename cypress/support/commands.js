Cypress.Commands.add("sendRequest", (url, method, body, auth) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (auth) {
        headers['Authorization'] = auth;
    }
    return cy.request({
        url: url,
        method: method,
        headers: headers,
        body: body,
        failOnStatusCode: false
    })
})