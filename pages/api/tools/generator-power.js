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


async function getTotalPowerInKVA(dataArr) {
    return new Promise((resolve, reject) => {
        const promises = []
        // change unit
        for (let i = 0; i < dataArr.length; i++) {
            const data = dataArr[i]
            promises.push(changeUnitToW(data))
        }

        // get total power
        Promise.all(promises).then((electronics) => {
            console.log(electronics)
            resolve(electronics)
        })
    })
}

async function changeUnitToW(dataObject) {
    // dataObject looks something like this { type: 'fridge', power: 14, unit: 'kw', quantity: 2 }
    // return all units to watts

    return new Promise((resolve, reject) => {
        // no data
        const data = { ...dataObject }
        if (!data.type) {
            reject('type not found')
            return
        }

        const acceptableUnits = ['tonne', 'kw', 'w', 'btu', 'hp']
        // wrong unit
        if (acceptableUnits.indexOf(data.unit) === -1) {
            reject('unreconginsed unit')
            return
        }

        const { power } = data

        switch (data.unit) {
            case 'w':
                data.power = power
                break
            case 'tonne':
                data.power = power * 1.2 * 1000
                break
            case 'kw':
                data.power = power * 1000
                break
            case 'btu':
                data.power = power / 10
                break
            case 'hp':
                data.power = power * 746
                break
        }

        data.unit = 'w'

        resolve(data)
    })
}

async function getTotalPower(dataObject) {
    // return total power in W
    return new Promise((resolve, reject) => {
        try {
            dataObject.forEach((dataRow) => {
                dataRow.totalPower = dataRow.power * dataRow.quantity
            })

            const totalPower = dataObject.reduce((a, b) => ({ totalPower: a.totalPower + b.totalPower }))
            console.log(totalPower)
            resolve(totalPower.totalPower)
        } catch (e) {
            reject(e)
            console.log(e)
        }
    })
}

async function convertWToKva(w) {
    return new Promise((resolve, reject) => {
        try {
            const kva = w / 1000 / 0.8
            resolve(kva)
        } catch (error) {
            reject(error)
        }
    })
}

export default async function handler(req, res) {
    // limit request to POST only
    console.log('received request')
    console.log(`method: ${req.method}`)
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests are allowed' })
        return
    }
    const body = req.body.data
    const result = await getTotalPowerInKVA(body)
    const totalPower = await getTotalPower(result)
    const totalKva = await convertWToKva(totalPower)

    return res.status(200).json({
        status: 'ok',
        content: result,
        total: totalPower,
        totalKva: Math.ceil(totalKva)
    })
}
