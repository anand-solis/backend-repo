const DefaultPermissions = () => {
    const permissions = [
        {
            "name": "Admin",
            "permissions": []
        },
        {
            "name": "Organization Manager",
            "permissions": []
        },
        {
            "name": "Project Manager",
            "permissions": []
        },
        {
            "name": "Project On-site Team",
            "permissions": [
                {
                    "name": "Roles & Permissions",
                    "id": "65a90755d46dee88bd5cd671",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Sites",
                    "id": "65a906bbd46dee88bd5cd670",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                }
            ]
        }
    ]

    return permissions;
}

module.exports = DefaultPermissions;