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
            "permissions": [
                {
                    "name": "Organization Profile",
                    "id": "65a625b5b07984b33a5673e5",
                    "read": true,
                    "update": false,
                    "delete": false,
                    "insert": false
                }
            ]
        },
        {
            "name": "Project On-site Team",
            "permissions": [
                {
                    "name": "Issues",
                    "id": "65a61f43b07984b33a5673e0",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Project Profile",
                    "id": "65a6226fb07984b33a5673e1",
                    "read": true,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Organization Profile",
                    "id": "65a625b5b07984b33a5673e5",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Organization Member",
                    "id": "65a62617b07984b33a5673e6",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "User Roles & Permissions",
                    "id": "65a626d7b07984b33a5673e7",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                }
            ]
        },
        {
            "name": "Collaborator Organization",
            "permissions": [
                {
                    "name": "Project Profile",
                    "id": "65a6226fb07984b33a5673e1",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Organization Profile",
                    "id": "65a625b5b07984b33a5673e5",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "Organization Member",
                    "id": "65a62617b07984b33a5673e6",
                    "read": false,
                    "update": false,
                    "delete": false,
                    "insert": false
                },
                {
                    "name": "User Roles & Permissions",
                    "id": "65a626d7b07984b33a5673e7",
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