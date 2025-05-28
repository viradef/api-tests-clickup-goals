export const unsetVars = (vars) => {
    Object.keys(vars).forEach(key => {
        vars[key] = undefined;
    });
};

export const buildUpdatePayload = (vars, overrides = {}) => ({
    name: vars.goal_name,
    description: vars.goal_description,
    multiple_owners: vars.goal_multiple_owners,
    due_date: vars.goal_due_date,
    color: vars.goal_color,
    ...overrides,
});