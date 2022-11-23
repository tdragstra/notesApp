let arr = [{ a: 1 }, { a: 1 }, { a: 1 }];

const arr3 = new Set(arr);
console.log(arr3);
const o1 = [{ a: 1 }];

// arr.push(Object.values(o1)[0]);
// console.log("new array", arr);
const o1keys = Object.values(o1)[0];
// console.log("keys", o1keys);
// const a = Object.values(arr);
// const b = Object.values(o1);
// console.log(a, b);

// const d = a === b;

// console.log(d);

const bla = [{ a: 1 }];
const bla1 = bla[0].a;
// console.log(bla1);
console.log("old array", arr);
const newArray = arr.filter((a) => {
	if (Object.keys(a)[0] === Object.keys(o1[0])[0]) {
		if (Object.values(a)[0] !== Object.values(o1[0])[0]) {
			return a;
		} else {
			arr.push(Object.values(o1[0]));
		}
	} else {
		return a;
	}
});

console.log("new array", newArray);

const newArray1 = newArray.map((a) => {
	console.log("log element key", Object.keys(a)[0]);
	console.log("log o1 key", Object.keys(o1[0])[0]);
	if (
		Object.keys(a)[0] === Object.keys(o1[0])[0] &&
		Object.values(a)[0] === Object.values(o1[0])[0]
	) {
		return null;
	} else {
		newArray.push(Object.values(o1)[0]);
		console.log("old array", newArray);
		return a;
	}
});

console.log("new array1", newArray1);

// const newarray2 = newArray1.filter((a) => {
// 	if (Object.keys(a)[0] === Object.keys(o1[0])[0]) {
// 		if (Object.values(a)[0] === Object.values(o1[0])[0]) {
// 			return null;
// 		} else {
// 			arr.push(Object.values(o1)[0]);
// 		}
// 	} else {
// 		return a;
// 	}
// });

// console.log("new array2", newarray2);

// console.log(Object.values(a)[0]);
// console.log(Object.values(o1[0])[0]);

// if (Object.values(a)[0] === Object.values(o1[0])[0]) {
// 	return a;
// }
