module.exports = {
    fetchResponse: (res, data, error, message) => {
        return res.status(200).json({ data, success: true, error, message });
    },
    duplicateResponse: (res, data, error, message) => {
        return res.status(409).json({ data, success: false, error, message });
    },
    createResponse: (res, data, error, message) => {
        return res.status(201).json({ data, success: true, error, message });
    },
    errorResponse: (res, data, error, message) => {
        return res.status(500).json({ data, success: false, error, message });
    },
    unauthorizedResponse: (res, data, error, message) => {
        return res.status(401).json({ data, success: false, error, message });
    }
}