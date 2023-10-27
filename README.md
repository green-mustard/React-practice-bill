# 2023 React 练习-记账本项目

# 本项目知识点

## Object.keys()的用法

Object.keys() 是 JavaScript 中的一个内置方法，用于返回一个对象自身可枚举属性的名称（键）组成的数组。这个方法的一般语法如下：

Object.keys(obj)
其中，obj 是你想要获取属性名称的对象。

Object.keys() 方法非常有用，因为它允许你遍历对象的属性，执行各种操作，例如：

遍历对象的属性：

const person = {
firstName: 'John',
lastName: 'Doe',
age: 30
};

const keys = Object.keys(person);

console.log(keys); // 输出：['firstName', 'lastName', 'age']
遍历对象的属性并执行操作：

const person = {
firstName: 'John',
lastName: 'Doe',
age: 30
};

Object.keys(person).forEach(key => {
console.log(key, person[key]);
});

// 输出：
// firstName John
// lastName Doe
// age 30
检查对象是否为空：

const emptyObject = {};

if (Object.keys(emptyObject).length === 0) {
console.log('对象为空');
} else {
console.log('对象不为空');
}
将对象属性转换为数组：

const person = {
firstName: 'John',
lastName: 'Doe',
age: 30
};

const keys = Object.keys(person);
const values = keys.map(key => person[key]);

console.log(values); // 输出：['John', 'Doe', 30]
请注意，Object.keys() 仅返回对象自身的可枚举属性，不包括从原型链继承的属性。如果你需要遍历对象的所有属性，包括继承的属性，可以使用其他方法，如 for...in 循环。

## 关于 billTypeToName 的用法

原代码：
export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
billListData[key].forEach(category => {
category.list.forEach(item => {
prev[item.type] = item.name
})
})
console.log(billListData)
return prev
}, {})

这段代码定义了两相关的常量：billListData 和 billTypeToName，并使用了 Object.keys()和 reduce()等 JavaScript 函数，让我们详细分析一下这段逻辑代码的功能和运行流程：

billListData 是一个包含支出（pay）和收入（income）两个大类的对象，每个大类包含多个具体类型（例如，餐饮、出行交通、工资等）。每个具体类型还包括一个 list 属性，它是一个数组，包含了该类型的子类型（例如，餐费、酒水饮料、打车租车等）。

billTypeToName 是一个用于将具体类型（例如，food、salary）映射到对应名称（例如，餐费、工资）的对象。它是通过使用 reduce() 函数从 billListData 中提取数据生成的。

下面是详细分析 billTypeToName 的生成过程：

Object.keys(billListData) 返回 ['pay', 'income']，这是 billListData 中的两大类类型。
.reduce((prev, key) => {...}, {}) 这里使用 reduce() 函数，初始化累加器 prev 为空对象 {}。
billListData[key].forEach(bill => {...}) 遍历每个大类（pay 和 income），然后对每个大类进行操作。
在内部循环中，category.list.forEach(item => {...}) 遍历每个大类中的子类型。
prev[item.type] = item.name 将子类型的 type 和 name 映射添加到 prev 对象中。

在上述 reduce() 方法中，prev 和 key 分别是回调函数的参数，具体解释如下：

prev: 这是累加器，它在整个 reduce() 过程中积累结果。在初始化时，你传入了一个空对象 {}，所以 prev 起初是一个空对象，然后通过迭代过程中不断添加键值对。最终，prev 将包含所有具体类型（type）和对应名称（name）的映射关系。

key: 这是数组中的当前元素，也就是 billListData 对象中的大类（pay 或 income）。key 随着 reduce() 的迭代逐渐变化，首先是 'pay'，然后是 'income'。在每个迭代步骤中，key 代表了当前正在处理的大类。

总之，prev 用于积累结果，而 key 代表当前迭代的大类。在内部的循环中，key 用于访问 billListData 中的每个大类，以提取具体类型的信息，然后将其映射到 prev 中，以便生成 billTypeToName 这个映射对象。

这段代码的目的是生成一个对象，其中具体类型（例如，food、salary）作为键，对应的名称（例如，餐费、工资）作为值。这在后续的数据处理和显示中很有用，因为你可以通过类型查找相应的名称，以更好地呈现数据给用户。

总结：billListData 是一个包含支出和收入类型的数据结构，而 billTypeToName 是一个生成的映射，将类型映射到对应的名称。这有助于更好地理解和展示数据。
