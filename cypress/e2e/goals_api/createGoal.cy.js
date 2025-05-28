import * as goals from "../../helper/goals";
import {generateGoalPayload, generateRandomString} from "../../helper/randomDataGenerators";

describe('Goals API Tests', () => {
    describe('POST Goal Tests', () => {
        let goal_id;
        let payload;

        beforeEach(() => {
            payload = generateGoalPayload();
            cy.log(`Generated payload: ${JSON.stringify(payload)}`);
        })

        afterEach(() => {
            payload = undefined;
            cy.log(`payload: ${payload}`)
            if(goal_id) {
                cy.log(`Cleaning up goal_id: ${goal_id}`);
                return goals.deleteGoalSuccess(goal_id).then(() => {
                    goal_id = undefined
                });
            }
        })

        it('Should return 200 and body contains specified name POST goal', () => {
            return goals.createGoal(payload, Cypress.env('teamId')).then((response) => {
                goal_id = response.body.goal.id;
                cy.log(`goal_id: ${goal_id}`);

                expect(response.status).to.eql(200)
                expect(response.body.goal.name, `POST response should contain request body name`).to.eql(payload.name)

                return goals.getOneGoal(goal_id).then((getresponse) => {
                    expect(getresponse.status, `Should return 200 GET created goal for goal_id`).to.eql(200)
                })
            })
        })

        it('Should return 400 POST goal without auth', () => {
            return goals.createGoalWithoutAuth(payload).then((response) => {
                expect(response.status).to.eql(400)
            })
        })

        it('Should return 400 POST goal with invalid team_id', () => {
            const invalidTeamId = generateRandomString(11);
            return goals.createGoal(payload, invalidTeamId).then((response) => {
                expect(response.status).to.eql(400)
            })
        })
    })
})