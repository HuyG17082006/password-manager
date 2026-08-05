export const folders = [
    {
        id: "folder-01",
        userId: "user-01",

        name: "Personal",
        totalAccounts: 3,

        isDeleted: false,
        isPinned: true,

        createdAt: "2026-07-01T08:00:00Z",
        updatedAt: "2026-07-20T09:30:00Z",
        deletedAt: null
    },
    {
        id: "folder-02",
        userId: "user-01",

        name: "Work",
        totalAccounts: 2,

        isDeleted: false,
        isPinned: false,

        createdAt: "2026-06-15T10:20:00Z",
        updatedAt: "2026-07-18T14:00:00Z",
        deletedAt: null
    },
    {
        id: "folder-03",
        userId: "user-01",

        name: "Banking",
        totalAccounts: 1,

        isDeleted: true,
        isPinned: false,

        createdAt: "2026-05-01T08:00:00Z",
        updatedAt: "2026-06-10T09:30:00Z",
        deletedAt: "2026-07-25T16:20:00Z"
    },
    
];

export const accounts = [
    {
        id: "account-01",
        userId: "user-01",
        folderId: "folder-01",

        applicationName: "GitHub",
        username: "huydev",
        email: "huydev@gmail.com",
        note: "Main development account.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://github.com",
        isPinned : false,

        isDeleted: false,

        passwordEncrypted: "encrypted_password_01",
        iv: "0123456789ab",
        authTag: "0123456789abcdef",

        createdAt: "2026-07-01T08:30:00Z",
        updatedAt: "2026-07-22T13:15:00Z",
        deletedAt: null
    },
    {
        id: "account-02",
        userId: "user-01",
        folderId: "folder-01",

        applicationName: "Google",
        username: "huy.personal",
        email: "huy.personal@gmail.com",
        note: "Personal Gmail.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://accounts.google.com",
        isPinned : false,

        isDeleted: true,

        passwordEncrypted: "encrypted_password_02",
        iv: "abcdef123456",
        authTag: "fedcba9876543210",

        createdAt: "2026-07-02T09:00:00Z",
        updatedAt: "2026-07-18T11:00:00Z",
        deletedAt: "2026-07-24T18:00:00Z"
    },
    {
        id: "account-03",
        userId: "user-01",
        folderId: "folder-01",

        applicationName: "Facebook",
        username: "huy.fb",
        email: "huy.fb@gmail.com",
        note: "Social account.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://facebook.com",
        isPinned : false,

        isDeleted: false,

        passwordEncrypted: "encrypted_password_03",
        iv: "112233445566",
        authTag: "6655443322110099",

        createdAt: "2026-07-03T12:00:00Z",
        updatedAt: "2026-07-10T16:30:00Z",
        deletedAt: null
    },
    {
        id: "account-04",
        userId: "user-01",
        folderId: "folder-02",

        applicationName: "Jira",
        username: "huy.work",
        email: "huy@company.com",
        note: "Company Jira.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://company.atlassian.net",
        isPinned : true,

        isDeleted: false,

        passwordEncrypted: "encrypted_password_04",
        iv: "123456abcdef",
        authTag: "abcdef1234567890",

        createdAt: "2026-06-16T10:00:00Z",
        updatedAt: "2026-07-15T08:00:00Z",
        deletedAt: null
    },
    {
        id: "account-05",
        userId: "user-01",
        folderId: "folder-02",

        applicationName: "Slack",
        username: "huy.team",
        email: "huy@company.com",
        note: "Workspace communication.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://slack.com",
        isPinned : false,

        isDeleted: false,

        passwordEncrypted: "encrypted_password_05",
        iv: "654321fedcba",
        authTag: "9988776655443322",

        createdAt: "2026-06-18T15:00:00Z",
        updatedAt: "2026-07-17T12:45:00Z",
        deletedAt: null
    },
    {
        id: "account-06",
        userId: "user-01",
        folderId: "folder-03",

        applicationName: "MB Bank",
        username: "0901234567",
        email: null,
        note: "Internet Banking.",
        owner: "Lê Huỳnh Đạt Huy",
        url: "https://online.mbbank.com.vn",
        isPinned : false,

        isDeleted: false,

        passwordEncrypted: "encrypted_password_06",
        iv: "fedcba654321",
        authTag: "0011223344556677",

        createdAt: "2026-05-02T10:00:00Z",
        updatedAt: "2026-06-20T09:00:00Z",
        deletedAt: null
    },
    
];

export const trashItems = [
    {
        type: "folder",

        id: "folder-1",

        title: "Personal",

        subtitle: null,

        description: "12 Accounts",

        folderName: null,

        deletedAt: "2026-07-26 10:20:00"
    },

    {
        type: "account",

        id: "account-1",

        title: "Github",

        subtitle: "dat_huy",

        description: "dat@gmail.com",

        folderName: "Personal",

        deletedAt: "2026-07-26 09:45:00"
    },

    {
        type: "folder",

        id: "folder-2",

        title: "Work",

        subtitle: null,

        description: "5 Accounts",

        folderName: null,

        deletedAt: "2026-07-25 18:30:00"
    },

    {
        type: "account",

        id: "account-2",

        title: "AWS",

        subtitle: "root",

        description: "root@company.com",

        folderName: "Work",

        deletedAt: "2026-07-25 16:10:00"
    },

    {
        type: "account",

        id: "account-3",

        title: "Gmail",

        subtitle: "huy.dev",

        description: "huy.dev@gmail.com",

        folderName: "Personal",

        deletedAt: "2026-07-24 21:05:00"
    }
];