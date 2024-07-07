export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === "object";
}

export function deepEqual(obj1: any, obj2: any): boolean {
  console.log("obj1", Object.keys(obj1));
  console.log("obj2", Object.keys(obj2));
  if (obj1 === obj2) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}