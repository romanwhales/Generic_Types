"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataTypes_1 = require("./dataTypes");
var people = [new dataTypes_1.Person("Bob Smith", "London"), new dataTypes_1.Person("Dora Peters", "New York")];
var products = [new dataTypes_1.Product("Running Shoes", 100), new dataTypes_1.Product("Hat", 25)];
let employees = [new dataTypes_1.Employee("Bob Smith", "Sales"), new dataTypes_1.Employee("Alice Jones", "Sales")];
let newArray = [...people, ...products];
newArray.forEach(item => console.log(`Item: ${item.name}`));
class PeopleCollection {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    add(newItem) {
        this.items.push(newItem);
    }
    getNames() {
        return this.items.map(item => item.name);
    }
    getItem(index) {
        return this.items[index];
    }
}
let peopleData = new PeopleCollection(people);
console.log(`Names: ${peopleData.getNames().join(',')}`);
let firstPerson = peopleData.getItem(0);
console.log(`First Person: ${firstPerson.name}, ${firstPerson.city}`);
console.log("Adding Support for Another Type");
class DataCollection {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    add(newItem) {
        this.items.push(newItem);
    }
    getNames() {
        return this.items.map(item => item.name);
    }
    getItem(index) {
        return this.items[index];
    }
}
let peopleData2 = new DataCollection(people);
console.log(`Names of people data2: ${peopleData2.getNames().join(", ")}`);
let firstPerson2 = peopleData2.getItem(0);
if (firstPerson2 instanceof dataTypes_1.Person) {
    console.log(`First Person: ${firstPerson2.name}, ${firstPerson2.city}`);
}
class DataCollectionGeneric {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    add(newItem) {
        this.items.push(newItem);
    }
    getItem(index) {
        return this.items[index];
    }
}
let peopleData3 = new DataCollectionGeneric(people);
console.log("\n Creating Generic Classes");
let firstPerson3 = peopleData3.getItem(0);
console.log(`First Person: ${firstPerson3.name}, ${firstPerson3.city}`);
let productData = new DataCollectionGeneric(products);
let firstProduct = productData.getItem(0);
console.log(`First Product: ${firstProduct.name}, ${firstProduct.price}`);
console.log("Constraining Generic Type Values");
class DataCollectionRestrict {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    add(newItem) {
        this.items.push(newItem);
    }
    getNames() {
        return this.items.map(item => item.name);
    }
    getItem(index) {
        return this.items[index];
    }
}
let peopleData4 = new DataCollectionRestrict(people);
console.log(`Person Names: ${peopleData4.getNames().join(', ')}`);
let productData4 = new DataCollectionRestrict(products);
console.log(`Product Names: ${productData4.getNames().join(",")}`);
console.log("\n Constraining Generic Types Using a Shape");
let cities = [new dataTypes_1.City("London", 8136000), new dataTypes_1.City("Paris", 2141000)];
class DataCollectionShape {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    add(newItem) {
        this.items.push(newItem);
    }
    getNames() {
        return this.items.map(item => item.name);
    }
    getItem(index) {
        return this.items[index];
    }
}
let cityData = new DataCollectionShape(cities);
console.log(`City Names: ${cityData.getNames().join(",")}`);
class DataCollectionMultipleTypes {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    collate(targetData, itemProp, targetProp) {
        let results = [];
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] === item[itemProp]);
            if (match !== undefined) {
                results.push({ ...match, ...item });
            }
        });
        return results;
    }
}
let peopleData5 = new DataCollectionMultipleTypes(people);
let collatedData = peopleData5.collate(cities, "city", "name");
console.log("Here");
collatedData.forEach(c => console.log(`${c.name}, ${c.city}, ${c.population}`));
console.log("\n Applying a Type Parameter to a Method");
class DataCollectionTypeMethod {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    collate(targetData, itemProp, targetProp) {
        let results = [];
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] == item[itemProp]);
            if (match !== undefined) {
                results.push({ ...match, ...item });
            }
        });
        return results;
    }
}
let peopleData6 = new DataCollectionTypeMethod(people);
let empData = peopleData6.collate(employees, "name", "name");
empData.forEach(c => console.log(`${c.name}, ${c.city}, ${c.role}`));
console.log("Extending Generic Classes");
class DataCollectionExtended {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    collate(targetData, itemProp, targetProp) {
        let results = [];
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] === item[itemProp]);
            if (match !== undefined) {
                results.push({ ...match, ...item });
            }
        });
        return results;
    }
}
class SearchableCollection extends DataCollectionExtended {
    constructor(intialItems) {
        super(intialItems);
    }
    find(name) {
        return this.items.find(item => item.name === name);
    }
}
let peopleData7 = new SearchableCollection(people);
let foundPerson = peopleData7.find("Bob Smith");
if (foundPerson !== undefined) {
    console.log(`Person ${foundPerson.name}, ${foundPerson.city}`);
}
console.log("fixing the Generic Type Parameter");
class SearchableCollectionFixGeneric extends DataCollectionExtended {
    constructor(intialItems) {
        super(intialItems);
    }
    find(searchTerm) {
        return this.items.filter(item => item.name === searchTerm || item.role === searchTerm);
    }
}
let employeeData = new SearchableCollectionFixGeneric(employees);
employeeData.find("Sales").forEach(e => console.log(`Employee ${e.name}, ${e.role}`));
console.log("Restricting the Generic type Parameter");
class SearchableCollectionRestriction extends DataCollectionExtended {
    constructor(intiialItems) {
        super(intiialItems);
    }
    find(searchTerm) {
        return this.items.filter(item => {
            if (item instanceof dataTypes_1.Employee) {
                return item.name === searchTerm || item.role === searchTerm;
            }
            else if (item instanceof dataTypes_1.Person) {
                return item.name === searchTerm || item.city === searchTerm;
            }
        });
    }
}
console.log("Type guarding Generic Types");
class DataCollectionTypePredicate {
    constructor(initialItems) {
        this.items = [];
        this.items.push(...initialItems);
    }
    filter(predicate) {
        return this.items.filter(item => predicate(item));
    }
}
let mixedData = new DataCollectionTypePredicate([...products, ...people]);
function isProduct(target) {
    return target instanceof dataTypes_1.Product;
}
let filteredProduct = mixedData.filter(isProduct);
filteredProduct.forEach(p => console.log(`Product: ${p.name}, ${p.price}`));
console.log("Defining a Static method on a Generic Class");
class DataCollectionStaticMetod {
    constructor(initialitems) {
        this.items = [];
        this.items.push(...initialitems);
    }
    filter(predicate) {
        return this.items.filter(item => predicate(item));
    }
    static reverse(items) {
        return items.reverse();
    }
    static revrseWithType(items) {
        return items.reverse();
    }
}
let reversdCitites = DataCollectionStaticMetod.reverse(cities);
reversdCitites.forEach(p => console.log(`City: ${p.name}, ${p.population}`));
console.log("Defining Generic Interfaces");
class ArrayCollection {
    constructor() {
        this.items = [];
    }
    add(...newItems) {
        this.items.push(...newItems);
    }
    get(name) {
        return this.items.find(item => item.name === name);
    }
    get count() {
        return this.items.length;
    }
}
let peopleCollection = new ArrayCollection();
let person1 = new dataTypes_1.Person("Bob Smith", "London");
let person2 = new dataTypes_1.Person("Dora Peters", "New York");
let person3 = [person1, person2];
peopleCollection.add(person1, person2);
console.log(`Collection size: ${peopleCollection.count}`);
console.log("Creating an Abstract Interface implementation");
class ArrayCollection2 {
    constructor() {
        this.items = [];
    }
    add(...newItems) {
        this.items.push(...newItems);
    }
    get count() {
        return this.items.length;
    }
}
class ProductCollection extends ArrayCollection2 {
    get(searchTerm) {
        return this.items.find(item => item.name === name);
    }
}
class PersonCollection extends ArrayCollection2 {
    get(searchTerm) {
        return this.items.find(item => item.name === name || item.city === name);
    }
}
let peopleCollection2 = new PersonCollection();
let productCollection2 = new ProductCollection();
peopleCollection2.add(new dataTypes_1.Person("Bob Smith", "London"), new dataTypes_1.Person("Dora Peters", "New York"));
let productCollection = new ProductCollection();
productCollection2.add(new dataTypes_1.Product("Running Shoes", 100), new dataTypes_1.Product("Hat", 25));
[peopleCollection2, productCollection2].forEach(c => console.log(`Size: ${c.count}`));
