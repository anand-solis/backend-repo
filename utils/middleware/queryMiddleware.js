const queryMiddleware = async (req, Model) => {
    const { fields, populate, sort, pagination, filters } = req.query;

    let sorting = sort ? getSorting(sort) : {};
    console.log(populate);

    // Populate By one
    // Populate all by *
    // Populate Multiple
    // Populate Selected Fields
    // Populate Populate
    // Populate Filter
    // Populate Sort
    // Populate Pagination

    const records = await Model
        .find(filters)
        .select(fields?.join(" "))
        .sort(sorting)
        .skip(pagination?.start)
        .limit(pagination?.limit)
        .populate({
            path: 'references',
            select: '-__v',
            options: {
                sort: { name: 1 },
                skip: 0,
                limit: 5
            },
            populate: {
                path: 'references',
                select: '-__v',
                options: {
                    sort: { name: 1 },
                    skip: 0,
                    limit: 3
                }
            }
        });

    return records;
}

const getSorting = (sort) => {
    let sorting = {};

    if (!isObject(sort) && !isArray(sort)) {
        sorting[sort] = "asc";
    }
    else if (isArray(sort)) {
        sort.map((object) => {
            const key = Object.keys(object);
            const value = object[key];
            sorting[key] = value;
        });
    }
    else if (isObject(sort)) {
        sorting = sort;
    }

    return sorting;
}

const isObject = (variable) => {
    return variable !== null && typeof variable === "object";
}

const isArray = (variable) => {
    return Array.isArray(variable);
}

module.exports = queryMiddleware;