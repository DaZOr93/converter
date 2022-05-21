let incomingJson = '{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}'

function convert_distance(json) {
    let incoming = JSON.parse(json)
    let convert_to = incoming.convert_to
    let unit = incoming.distance.unit
    let value = incoming.distance.value

//соотношение к 1 см
    const COEFFICIENT = {
        cm: 1,
        m: 0.01,
        in: 0.3937,
        ft: 0.03281,
    }

    //проверка входных значений
    let error = {
        error: []
    }
    if ((COEFFICIENT[convert_to] === undefined) || (COEFFICIENT[unit] === undefined)) {
        error.error.push('Не правильно задана единица измерений')
    }
    if (isNaN(value) === true) {
        error.error.push('Значение не число')
    }
    if (error.error.length !== 0) {
        return JSON.stringify(error)
    }
    //переводим число в см
    let value_in_cm = value / COEFFICIENT[unit];

//переводим в нужную величину
    let result = value_in_cm * COEFFICIENT[convert_to];
//окургляем до 2 знаков после запятой
    value = result.toFixed(2)

    result = {
        unit: convert_to,
        value: value,
    };

    return JSON.stringify(result)
}

console.log(convert_distance(incomingJson))

let include = '{"data": [{"user": "mike@mail.com", "rating": 20, "disabled": false},' +
    '{"user": "greg@mail.com", "rating": 14, "disabled": false},' +
    '{"user": "john@mail.com", "rating": 25, "disabled": true}],' +
    '"condition": {"include": [{"disabled": true}], "sort_by": ["rating"]}}'
function sort(json){
    let incoming = JSON.parse(json)
    let data = incoming.data
    let sortBy = incoming.condition.sort_by
    //сортировка
    function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
    }
    data = data.sort(byField(sortBy))
    //фильтрация
    function include (data, name, value){
        return  data.filter(element => element.name === value);
    }




}

sort(include)