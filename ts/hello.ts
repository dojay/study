interface Person {
  readonly name: string,
  readonly other: Object
}

let j: Person = {
  name: '老王',
  other: {
    age: 18
  }
}

j.other.age = 'shun'


