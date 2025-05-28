const baseUrl = Cypress.env('url')
const auth = Cypress.env('clickupToken')
const teamId = Cypress.env('teamId')


export const getAllGoals = ((team_id) => {
    return cy.sendRequest(`${baseUrl}/team/${team_id}/goal`, 'GET', null, auth)
})

export const getAllGoalsWithoutAuth = (() => {
    return cy.sendRequest(`${baseUrl}/team/${teamId}/goal`, 'GET', null, null)
})

export const createGoal = ((payload, teamId) => {
    return cy.sendRequest(`${baseUrl}/team/${teamId}/goal`, 'POST', payload, auth)
})

export const createGoalWithoutAuth = ((payload) => {
    return cy.sendRequest(`${baseUrl}/team/${teamId}/goal`, 'POST', payload, null)
})

export const deleteGoalSuccess = ((goal_id) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'DELETE', null, auth)
})

export const deleteGoalWithoutAuth = ((goal_id) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'DELETE', null, null)
})

export const getOneGoal = ((goal_id) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'GET', null, auth)
})

export const getOneGoalWithoutAuth = ((goal_id) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'GET', null, null)
})

export const updateGoalSuccess = ((goal_id, updatePayload) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'PUT', updatePayload, auth)
})

export const updateGoalWithoutAuth = ((goal_id, updatePayload) => {
    return cy.sendRequest(`${baseUrl}/goal/${goal_id}`, 'PUT', updatePayload, null)
})