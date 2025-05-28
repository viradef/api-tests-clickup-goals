import { faker } from '@faker-js/faker';

export const generateGoalPayload = () => ({
    name: faker.company.name(),
    multiple_owners: faker.datatype.boolean(),
    description: faker.lorem.sentence(),
    due_date: faker.number.int( {min: 1, max: 20000000000000}),
    color: faker.color.rgb()
});

export const generateRandomString = (length) => {
    if (!Number.isInteger(length) || length < 1) {
        throw new Error("Length must be a positive integer");
    }
    return faker.string.alphanumeric(length);
};

export const generateRandomUUID = () => {
    return faker.string.uuid();
};

export const generateNewGoalName = (oldName) => {
    let newName;
    do{
        newName = faker.company.name();
    } while(newName === oldName);
    return newName;
};

export const generateNewGoalDescription = (oldDescription) => {
    let newDescription;
    do{
        newDescription = faker.lorem.sentence();
    } while(newDescription === oldDescription);
    return newDescription;
}