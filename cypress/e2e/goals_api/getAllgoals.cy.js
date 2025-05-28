import * as goals from "../../helper/goals";
import {generateGoalPayload, generateRandomString} from "../../helper/randomDataGenerators";

describe('Goals API Tests', () => {
    describe('GET All Goals Tests', () => {
        let goal1_id, goal2_id;

        before(() => {
            return goals.createGoal(generateGoalPayload(), Cypress.env('teamId')).then((res) => {
                goal1_id = res.body.goal.id;
                return goals.createGoal(generateGoalPayload(), Cypress.env('teamId')).then((res) => {
                    goal2_id = res.body.goal.id;
                });
            });
        });
        after(() => {
            if (goal1_id && goal2_id) {
                return goals.deleteGoalSuccess(goal1_id).then(() => {
                    return goals.deleteGoalSuccess(goal2_id);
                });
            }
        })

        it('Should return 200 and created goals ids GET all goals with valid team_id', () => {
            goals.getAllGoals(Cypress.env('teamId')).then((response) => {
                expect(response.status).to.eql(200)
                const returnedGoalIds = response.body.goals.map((resIds) => resIds.id);
                expect(returnedGoalIds, `Goal 1 id should be in response body`).to.include(goal1_id)
                expect(returnedGoalIds, `Goal 2 id should be in response body`).to.include(goal2_id)
            })
        })

        it('Should return 400 GET all goals without auth', () => {
            goals.getAllGoalsWithoutAuth().then((response) => {
                expect(response.status).to.eql(400)
            })
        })
        it('Should return 400 GET all goals with invalid team_id', () => {
            goals.getAllGoals(generateRandomString(10)).then((response) => {
                expect(response.status).to.eql(400)
            })
        })
    })
})