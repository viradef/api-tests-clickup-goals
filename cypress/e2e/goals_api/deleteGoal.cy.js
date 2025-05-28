import * as goals from "../../helper/goals";
import {generateGoalPayload, generateRandomUUID} from "../../helper/randomDataGenerators";
import {deleteGoalWithoutAuth} from "../../helper/goals";

describe(`Goals API Tests`, () => {
    describe(`DELETE Goal Tests`, () => {
        let goal_id;

        beforeEach(() => {
            goal_id = undefined;
            return goals.createGoal(generateGoalPayload(), Cypress.env('teamId')).then((res) => {
                goal_id = res.body.goal.id;
                cy.log(`Goal id: ${goal_id}`);
            });
        })
        afterEach(() => {
            if (goal_id) {
                return goals.deleteGoalSuccess(goal_id).then(()  => {
                    goal_id = undefined;
                });
            }
        })

        it('Should return 200 DELETE goal with valid goal_id', () => {
            return goals.getOneGoal(goal_id).then((response) => {
                expect(response.status, 'Goal should exist before deletion').to.equal(200);
                cy.log(`Goal exists: ${goal_id}`);
                return goals.deleteGoalSuccess(goal_id).then((response)  => {
                    expect(response.status).to.equal(200);
                    return goals.getOneGoal(goal_id).then((response) => {
                        expect(response.status, `Could not GET deleted goal`).to.equal(404);
                    }).then(() => {
                        goal_id = undefined;
                    });
                })
            })
        })

        it('Should return 400 DELETE goal without auth', () => {
            return goals.deleteGoalWithoutAuth(goal_id).then((response)  => {
                expect(response.status).to.equal(400);
            })
        })

        it('Should return 404 or 401 when deleting a goal with unknown or unauthorized goal_id', () => {
            let randomGoalId;
            do{
                randomGoalId = generateRandomUUID();
            } while(randomGoalId === goal_id);
            cy.log(`Goal random id: ${randomGoalId}`);
            return goals.deleteGoalSuccess(randomGoalId).then((response) => {
                expect(response.status).to.be.oneOf([404, 401]);
            });
        });
    })
})