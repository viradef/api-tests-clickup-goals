import * as goals from "../../helper/goals";
import {generateGoalPayload, generateRandomUUID} from "../../helper/randomDataGenerators";

describe('Goals API Tests', () => {
    describe('GET Goal For goal_id Tests', () => {
        let goal_id;

        before(() => {
            return goals.createGoal(generateGoalPayload(), Cypress.env('teamId')).then((res) => {
                goal_id = res.body.goal.id;
                cy.log(`Goal id: ${goal_id}`);
            });
        });
        after(() => {
            if (goal_id) {
                return goals.deleteGoalSuccess(goal_id).then(()  => {
                    goal_id = undefined;
                });
            }
        })

        it('Should return 200 GET goal with valid goal_id', () => {
            return goals.getOneGoal(goal_id).then((response) => {
                expect(response.status).to.equal(200);
            });
        });

        it('Should return 400 GET goal without auth', () => {
            return goals.getOneGoalWithoutAuth(goal_id).then((response) => {
                expect(response.status).to.equal(400);
            });
        });

        it('Should return 404 or 401 when accessing a goal with unknown or unauthorized goal_id', () => {
            let randomGoalId;
            do{
                randomGoalId = generateRandomUUID();
            } while(randomGoalId === goal_id);
            cy.log(`Goal random id: ${randomGoalId}`);
            return goals.getOneGoal(randomGoalId).then((response) => {
                expect(response.status).to.be.oneOf([404, 401]);
            });
        });
    });
})