import * as goals from "../../helper/goals";
import {
    generateGoalPayload, generateNewGoalDescription,
    generateNewGoalName
} from "../../helper/randomDataGenerators";
import {buildUpdatePayload, unsetVars} from "../../helper/helpers";

describe('Goals API Tests', () => {
    describe('PUT Goal Tests', () => {
        const vars = {};

        beforeEach(() => {
            unsetVars(vars);
            return goals.createGoal(generateGoalPayload(), Cypress.env('teamId')).then((res) => {
                vars.goal_id = res.body.goal.id;
                vars.goal_name = res.body.goal.name;
                vars.goal_description = res.body.goal.description;
                vars.goal_multiple_owners = res.body.goal.multiple_owners;
                vars.goal_due_date = res.body.goal.due_date;
                vars.goal_color = res.body.goal.color;
            })
        })
        afterEach(() => {
            if (vars.goal_id) {
                cy.log(`Cleaning up goal_id: ${vars.goal_id}`);
                return goals.deleteGoalSuccess(vars.goal_id).then(() => {
                    unsetVars(vars);
                });
            }
        })

        it('Should return 200 and goal name is updated PUT goal', () => {
            const newName = generateNewGoalName(vars.goal_name);
            const payload = buildUpdatePayload(vars, { name : newName});

            return goals.updateGoalSuccess(vars.goal_id, payload).then((response) => {
                expect(response.status).to.equal(200);
                cy.log(`old_name: ${vars.goal_name}`);
                cy.log(`new_name: ${newName}`);

                return goals.getOneGoal(vars.goal_id).then((response) => {
                    expect(response.body.goal.name, 'GET goal should return goal with new name').to.equal(newName);
                    expect(response.body.goal.description, 'description should not be changed').to.equal(vars.goal_description);
                    expect(response.body.goal.multiple_owners, 'multiple_owners should not be changed').to.equal(vars.goal_multiple_owners);
                    expect(response.body.goal.due_date, 'due_date should not be changed').to.equal(vars.goal_due_date);
                    expect(response.body.goal.color, 'color should not be changed').to.equal(vars.goal_color);
                })
            })
        })

        it('Should return 200 and goal description is updated PUT goal', () => {
            const newDesc = generateNewGoalDescription(vars.goal_description);
            const payload = buildUpdatePayload(vars,{ description : newDesc});

            return goals.updateGoalSuccess(vars.goal_id, payload).then((response) => {
                expect(response.status).to.equal(200);
                cy.log(`old_description: ${vars.goal_description}`);
                cy.log(`new_description: ${newDesc}`);

                return goals.getOneGoal(vars.goal_id).then((response) => {
                    expect(response.body.goal.description, 'GET goal should return goal with new description').to.equal(newDesc);
                    expect(response.body.goal.name, 'name should not be changed').to.equal(vars.goal_name);
                    expect(response.body.goal.multiple_owners, 'multiple_owners should not be changed').to.equal(vars.goal_multiple_owners);
                    expect(response.body.goal.due_date, 'due_date should not be changed').to.equal(vars.goal_due_date);
                    expect(response.body.goal.color, 'color should not be changed').to.equal(vars.goal_color);
                })
            })
        })

        it('Should return 400 update goal without auth', () => {
            const newName = generateNewGoalName(vars.goal_name);
            const payload = buildUpdatePayload(vars, { name : newName});
            return goals.updateGoalWithoutAuth(vars.goal_id, payload).then((response) => {
                expect(response.status).to.equal(400);
            })
        })
    })
})