// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter = req.query.mealFilter
    const typeFilter = req.query.typeFilter
    const sortBy = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 


    // TODO Part I-3-a: find the information to all restaurants

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
    try {
        const restInfo = await Info.find({});
        let answer = [];
        for (const rest of restInfo) {
            let add = true;
            if (priceFilter) {
                if (!priceFilter.includes(rest.price.toString())) {
                    add = false;
                }
            }
            if (mealFilter) {
                const intersect = rest.tag.filter((item) => mealFilter.includes(item));
                if (intersect.length === 0) {
                    add = false;
                }
            }
            if (typeFilter) {
                const intersect = rest.tag.filter((item) => typeFilter.includes(item));
                if (intersect.length === 0) {
                    add = false;
                }
            }
            if (add) answer.push(rest);
        }
        answer.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            else if (a[sortBy] > b[sortBy]) return 1;
            else return 0;
        })
        res.status(200).send({ message: 'success', contents: answer });
    } catch (e) {
        res.status(403).send({ message: "error", contents: "GetSearch Error" });
    }
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    try {
        const restaurant = await Info.findOne({ id });
        res.status(200).send({ message: 'success', contents: restaurant });
    } catch (e) {
        res.status(403).send({ message: "error", contents: "GetInfo Error" });
    }
}