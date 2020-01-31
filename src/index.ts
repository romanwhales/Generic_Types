import {Person,Product,City,Employee,} from "./dataTypes";

var people = [new Person("Bob Smith","London"),new Person("Dora Peters","New York")];

var products = [new Product("Running Shoes",100),new Product("Hat",25)]

let employees = [new Employee("Bob Smith","Sales"),new Employee("Alice Jones","Sales")]

let newArray = [...people, ...products]

newArray.forEach(item => console.log(`Item: ${item.name}`))

class PeopleCollection{
    private items: Person[] = [];

    constructor(initialItems: Person[]){
        this.items.push(...initialItems)
    }

    add(newItem: Person){
        this.items.push(newItem);
    }
    getNames():string[]{
        return this.items.map(item => item.name)
    }
    getItem(index:number):Person{
        return this.items[index]
    }

}

let peopleData = new PeopleCollection(people)
console.log(`Names: ${peopleData.getNames().join(',')}`);
let firstPerson = peopleData.getItem(0)
console.log(`First Person: ${firstPerson.name}, ${firstPerson.city}`)


console.log("Adding Support for Another Type")
type dataType = Person | Product
class DataCollection{
    private items: dataType[] = [];

    constructor(initialItems: dataType[]){
        this.items.push(...initialItems);
    }
    add(newItem:dataType){
        this.items.push(newItem)
    }
    getNames():string[]{
        return this.items.map(item => item.name)
    }
    getItem(index:number):dataType{
        return this.items[index]
    }
}

let peopleData2 = new DataCollection(people);
console.log(`Names of people data2: ${peopleData2.getNames().join(", ")}`)

let firstPerson2 = peopleData2.getItem(0)
if(firstPerson2 instanceof Person){
    console.log(`First Person: ${firstPerson2.name}, ${firstPerson2.city}`);
}


class DataCollectionGeneric<T>{
    private items: T[] = []

    constructor(initialItems:T[]){
        this.items.push(...initialItems);
    }

    add(newItem:T){
        this.items.push(newItem);
    }
    getItem(index:number):T{
        return this.items[index]
    }
}

let peopleData3 = new DataCollectionGeneric<Person>(people);
console.log("\n Creating Generic Classes");
let firstPerson3 = peopleData3.getItem(0)
console.log(`First Person: ${firstPerson3.name}, ${firstPerson3.city}`)

let productData = new DataCollectionGeneric<Product>(products)
let firstProduct = productData.getItem(0)
console.log(`First Product: ${firstProduct.name}, ${firstProduct.price}`)

console.log("Constraining Generic Type Values")
class DataCollectionRestrict<T extends (Person | Product)>{
    private items: T[] = [];
    constructor(initialItems: T[]){
        this.items.push(...initialItems)
    }
    add(newItem:T){
        this.items.push(newItem)
    }
    getNames():string[]{
        return this.items.map(item => item.name);
    }
    getItem(index:number){
        return this.items[index];
    }
}
let peopleData4 = new DataCollectionRestrict<Person>(people);
console.log(`Person Names: ${peopleData4.getNames().join(', ')}`)

let productData4 = new DataCollectionRestrict<Product>(products);
console.log(`Product Names: ${productData4.getNames().join(",")}`)

console.log("\n Constraining Generic Types Using a Shape")
let cities = [new City("London",8136000),new City("Paris",2141000)]

class DataCollectionShape<T extends {name:string}>{
    private items:T[] =[]
    constructor(initialItems:T[]){
        this.items.push(...initialItems);
    }
    add(newItem:T){
        this.items.push(newItem)
    }
    getNames():string[]{
        return this.items.map(item => item.name)
    }
    getItem(index:number):T{
        return this.items[index]
    }
}

let cityData = new DataCollectionShape<City>(cities);
console.log(`City Names: ${cityData.getNames().join(",")}`)

class DataCollectionMultipleTypes<T extends {name:string},U>{
    private items: T[] = []
    constructor(initialItems: T[]){
        this.items.push(...initialItems)
    }
    collate(targetData: U[],itemProp: string,targetProp:string):(T&U)[]{
        let results = []
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] === item[itemProp]);
            if(match !== undefined){
                results.push({...match,...item})
            }
        })
        return results
    }
}

let peopleData5 = new DataCollectionMultipleTypes<Person,City>(people)
let collatedData = peopleData5.collate(cities,"city","name")
console.log("Here")
collatedData.forEach(c => console.log(`${c.name}, ${c.city}, ${c.population}`))

console.log("\n Applying a Type Parameter to a Method")

class DataCollectionTypeMethod<T extends {name:string}>{
    private items: T[] = [];
    constructor(initialItems: T[]){
        this.items.push(...initialItems);
    }
    collate<U>(targetData:U[],itemProp: string,targetProp:string): (T&U)[]{
        let results = []
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] == item[itemProp]);
            if(match !== undefined){
                results.push({...match,...item})
            }
        })
        return results;
    }
}

let peopleData6 = new DataCollectionTypeMethod<Person>(people);
let empData = peopleData6.collate<Employee>(employees,"name","name");
empData.forEach(c => console.log(`${c.name}, ${c.city}, ${c.role}`))

console.log("Extending Generic Classes");

class DataCollectionExtended<T extends {name:string}>{
    protected items: T[] = []

    constructor(initialItems: T[]){
        this.items.push(...initialItems);
    }
    collate<U>(targetData:U[],itemProp:string,targetProp:string):(T&U)[]{
        let results = [ ]
        this.items.forEach(item => {
            let match = targetData.find(d => d[targetProp] === item[itemProp])
            if(match !== undefined){
                results.push({...match,...item})
            }
        })
        return results
    }
}

class SearchableCollection<T extends {name:string}> extends DataCollectionExtended<T>{
    constructor(intialItems:T[]){
        super(intialItems);
    }
    find(name:string):T|undefined{
        return this.items.find(item => item.name === name)
    }
}

let peopleData7 = new SearchableCollection<Person>(people)
let foundPerson = peopleData7.find("Bob Smith")
if (foundPerson !== undefined){
    console.log(`Person ${foundPerson.name}, ${foundPerson.city}`)
}

console.log("fixing the Generic Type Parameter");

class SearchableCollectionFixGeneric extends DataCollectionExtended<Employee>{
    constructor(intialItems:Employee[]){
        super(intialItems);
    }
    find(searchTerm:string):Employee[]{
        return this.items.filter(item => item.name === searchTerm || item.role === searchTerm);
    }
}

let employeeData = new SearchableCollectionFixGeneric(employees)
employeeData.find("Sales").forEach(e => console.log(`Employee ${e.name}, ${e.role}`))

console.log("Restricting the Generic type Parameter");

class SearchableCollectionRestriction<T extends Employee | Person> extends DataCollectionExtended<T>{
    constructor(intiialItems:T[]){
        super(intiialItems);
    }
    find(searchTerm:string): T[]{
        return this.items.filter(item => {
            if(item instanceof Employee){
                return item.name === searchTerm || item.role === searchTerm
            }else if(item instanceof Person){
                return item.name === searchTerm || item.city === searchTerm
            }
        })
    }
}

console.log("Type guarding Generic Types");
class DataCollectionTypePredicate<T>{
    protected items: T[]= [];
    constructor(initialItems:T[]){
        this.items.push(...initialItems);
    }
    filter<V extends T>(predicate: (target) => target is V):V[]{
        return this.items.filter(item => predicate(item)) as V[]
    }
}

let mixedData = new DataCollectionTypePredicate<Person | Product>([...products,...people])
function isProduct(target):target is Product{
    return target instanceof Product
}

let filteredProduct = mixedData.filter<Product>(isProduct);
filteredProduct.forEach(p => console.log(`Product: ${p.name}, ${p.price}`))

console.log("Defining a Static method on a Generic Class");

class DataCollectionStaticMetod<T>{
    protected items:T[] = []

    constructor(initialitems:[]){
        this.items.push(...initialitems)
    }

    filter<V extends T>(predicate: (target) => target is V):V[]{
        return this.items.filter(item => predicate(item)) as V[];
    }
    static reverse(items:any[]){
        return items.reverse()
    }
    static revrseWithType<ArrayType>(items:ArrayType[]):ArrayType[]{
        return items.reverse()
    }
}

let reversdCitites: City[] = DataCollectionStaticMetod.reverse(cities);
reversdCitites.forEach(p => console.log(`City: ${p.name}, ${p.population}`))


console.log("Defining Generic Interfaces");

type shapeType = {
    name:string
}

interface Collection<T extends shapeType>{
    add(...newItems: T[]):void
    get(name:string):void
    count:number;
}

class ArrayCollection<DataType extends shapeType> implements Collection<DataType>{
    private items: DataType[] = [];

    add(...newItems):void{
        this.items.push(...newItems);
    }
    get(name:string):DataType{
        return this.items.find(item => item.name === name)
    }

    get count():number{
        return this.items.length;
    }

}

let peopleCollection: Collection<Person> = new ArrayCollection()
let person1 = new Person("Bob Smith","London")
let person2 = new Person("Dora Peters","New York")
let person3 :Person[]= [person1,person2]
peopleCollection.add(person1,person2);
console.log(`Collection size: ${peopleCollection.count}`);


console.log("Creating an Abstract Interface implementation");
abstract class ArrayCollection2<T extends shapeType> implements Collection<T>{
    protected items:T[] = [];
    add(...newItems: T[]): void{
        this.items.push(...newItems);
    }
    abstract get(searchTerm:string):T;
    get count():number{
        return this.items.length;
    }
}

class ProductCollection extends ArrayCollection2<Product>{
    get(searchTerm:string):Product{
        return this.items.find(item => item.name === name);
    }
}

class PersonCollection extends ArrayCollection2<Person>{
    get(searchTerm:string):Person{
        return this.items.find(item => item.name === name || item.city === name);
    }
}

let peopleCollection2: Collection<Person> = new PersonCollection();
let productCollection2: Collection<Product> = new ProductCollection()
peopleCollection2.add(new Person("Bob Smith","London"),new Person("Dora Peters","New York"));
let productCollection: Collection<Product> = new ProductCollection();
productCollection2.add(new Product("Running Shoes",100),new Product("Hat",25));

[peopleCollection2,productCollection2].forEach(c => console.log(`Size: ${c.count}`))



