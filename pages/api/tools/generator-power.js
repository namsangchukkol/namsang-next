// To clean up
// const data = [
//     { type: 'ac', power: 12000, unit: 'btu', quantity: 1 },
//     { type: 'ac', power: 1, unit: 'tonne', quantity: 1 },
//     { type: 'heater', power: 5, unit: 'kw', quantity: 1 },
//     { type: 'heater', power: 500, unit: 'w', quantity: 1 },
//     { type: 'motor', power: 10, unit: 'hp', quantity: 1 },
//     { type: 'motor', power: 1.5, unit: 'hp', quantity: 1 },
//     { type: 'light', power: 15, unit: 'w', quantity: 500 }
// ]

const MOTOR_EFFICIENCY = 0.85; //80% motor efficiency
const STARTING_V_DIP = 0.2;

async function getTotalPowerInKVA(dataArr) {
  console.log('getTotalPowerInKVA');
  return new Promise((resolve, reject) => {
    const promises = [];
    // change unit
    for (let i = 0; i < dataArr.length; i++) {
      const data = dataArr[i];
      promises.push(changeUnitToW(data));
    }

    // get total power
    Promise.all(promises).then(electronics => {
      console.log('electronics', electronics);
      resolve(electronics);
    });
  });
}

async function changeUnitToW(dataObject) {
  // dataObject looks something like this { type: 'fridge', power: 14, unit: 'kw', quantity: 2 }
  // return all units to watts
  console.log('changeUnitToW');
  return new Promise((resolve, reject) => {
    // no data
    const data = { ...dataObject };
    if (!data.type) {
      reject('type not found');
      return;
    }

    const acceptableUnits = ['tonne', 'kw', 'w', 'btu', 'hp'];
    // wrong unit
    if (acceptableUnits.indexOf(data.unit) === -1) {
      reject('unreconginsed unit');
      return;
    }

    const { power } = data;

    switch (data.unit) {
      case 'w':
        data.power = power;
        break;
      case 'tonne':
        data.power = power * 1.2 * 1000;
        break;
      case 'kw':
        data.power = power * 1000;
        break;
      case 'btu':
        data.power = power / 10;
        break;
      case 'hp':
        data.power = power * 746;
        break;
    }

    data.unit = 'w';

    resolve(data);
  });
}

async function addMotorEfficiency(dataObject) {
  return new Promise((resolve, reject) => {
    try {
      dataObject.forEach(dataRow => {
        if (dataRow.type === 'motor') {
          dataRow.power = Math.ceil(dataRow.power / MOTOR_EFFICIENCY, 0);
        }
      });
      resolve(dataObject);
    } catch (err) {
      reject(err);
    }
  });
}

async function getTotalPower(dataObject, field, outputField) {
  // return total power in W
  console.log('getTotalPower');
  return new Promise((resolve, reject) => {
    try {
      dataObject.forEach(dataRow => {
        dataRow[outputField] = dataRow[field] * dataRow.quantity;
      });

      const totalPower = dataObject.reduce((a, b) => ({
        [outputField]: a[outputField] + b[outputField],
      }));
      console.log(totalPower);
      resolve(totalPower[outputField]);
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
}

async function getMaxPower(dataObject, field, outputField) {
  // return total power in W
  console.log('getTotalPower');
  return new Promise((resolve, reject) => {
    try {
      let max = 0;
      dataObject.forEach(dataRow => {
        dataRow[outputField] = dataRow[field] * dataRow.quantity;
        if (dataRow[outputField] > max) max = dataRow[outputField];
      });

      console.log(max);
      resolve(max);
    } catch (e) {
      reject(e);
      console.log(e);
    }
  });
}

async function convertWToKva(w) {
  return new Promise((resolve, reject) => {
    try {
      const kva = w / 1000 / 0.8;
      resolve(kva);
    } catch (error) {
      reject(error);
    }
  });
}

async function getStartingPower(dataObj) {
  return new Promise((resolve, reject) => {
    try {
      for (let i = 0; i < dataObj.length; i++) {
        const obj = dataObj[i];
        console.log(obj.type);
        switch (obj.type) {
          case 'light':
            obj.startingKva = obj.power * 1;
            break;
          case 'ac':
            obj.startingKva = obj.power * 3;
            break;
          case 'motor':
            obj.startingKva = obj.power * 3;
            break;
          default:
            obj.startingKva = 0;
            break;
        }
      }
      resolve(dataObj);
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export default async function handler(req, res) {
  // limit request to POST only
  console.log('received request');
  console.log(`method: ${req.method}`);
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests are allowed' });
    return;
  }
  const body = req.body.data;
  const result = await getTotalPowerInKVA(body);
  //   const totalPower = await getTotalPower(result);
  //   const totalKva = await convertWToKva(totalPower);
  await addMotorEfficiency(result);
  await getStartingPower(result);
  const totalPower = await getTotalPower(result, 'power', 'totalPower');
  //   const startingPower =
  //     (await getTotalPower(result, 'startingKva', 'startingKva')) *
  //     (1 - STARTING_V_DIP);
  const startingPower =
    (await getMaxPower(result, 'startingKva', 'startingKva')) *
    (1 - STARTING_V_DIP);
  const totalKva = await convertWToKva(totalPower);
  const startingPowerKva = await convertWToKva(startingPower);
  console.log(result);
  console.log(`starting power is ${startingPowerKva}`);
  console.log(`running power is ${totalKva}`);
  console.log(`total required KVA is ${totalKva + startingPowerKva}`);
  return res.status(200).json({
    status: 'ok',
    content: result,
    total: totalPower,
    totalKva: Math.ceil(totalKva + startingPowerKva),
  });
}

// async function test() {
//   const data = [
//     { type: 'motor', power: 10, unit: 'kw', quantity: 1 },
//     { type: 'motor', power: 10, unit: 'hp', quantity: 1 },
//     { type: 'ac', power: 12000, unit: 'btu', quantity: 1 },
//   ];

//   const result = await getTotalPowerInKVA(data);
//   await addMotorEfficiency(result);
//   await getStartingPower(result);
//   const totalPower = await getTotalPower(result, 'power', 'totalPower');
//   //   const startingPower =
//   //     (await getTotalPower(result, 'startingKva', 'startingKva')) *
//   //     (1 - STARTING_V_DIP);
//   const startingPower =
//     (await getMaxPower(result, 'startingKva', 'startingKva')) *
//     (1 - STARTING_V_DIP);
//   const totalKva = await convertWToKva(totalPower);
//   const startingPowerKva = await convertWToKva(startingPower);
//   console.log(totalKva + startingPowerKva);
//   return totalKva + startingPowerKva;
// }

// async function run() {
//   const result = await test();

//   console.log(result);
// }

// run();
