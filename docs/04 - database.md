# Database

## users
	id char(36) primary key not null,
    username varchar(60) unique not null,
    passwordHash varchar(255) not null,
    email varchar(512) not null unique,
    isEmailVerified boolean DEFAULT false,
    isNewUser boolean DEFAULT true,
    avatarUrl text null,
    createdAt datetime DEFAULT current_timestamp,
    updatedAt datetime null


## refreshTokens
    id char(36) primary key not null,
    userId char(36) not null,
    refreshTokenHash varchar(255) not null unique,
    createdAt DATETIME DEFAULT current_timestamp,
    expiredAt DATETIME not null,

    forgein key (userId) references users(id)


## loginVerifications
    id char(36) primary key not null,
    userId char(36) not null,
    createdAt DATETIME DEFAULT current_timestamp,
    expiredAt DATETIME not null,
    status enum('pending', 'accepted', 'rejected'),
    deviceId char(36) not null,

    forgein key (userId) references users(id)


## otps
    id char(36) primary key not null,
    otp char(6) not null,
    email varchar(512) not null,
    createdAt DATETIME DEFAULT current_timestamp,
    expiredAt DATETIME not null,
    attemps INT Default 0,

    forgein key (email) references users(email)


## accounts
    id char(36) primary key not null,
    userId char(36) not null,
    folderId char(36) null,

    applicationName varchar(100) not null,
    username varchar(255) DEFAULT null,
    email varchar(512) DEFAULT null,
    note TEXT DEFAULT 'Ghi chú...',
    owner varchar(120) NULL,
    url varchar(2048) DEFAULT null,
    isPinned boolean DEFAULT false,
    isDeleted boolean DEFAULT false,

    passwordEncrypted TEXT not null,
    iv BINARY(12) not null,
    authTag BINARY(16) not null,

    createdAt datetime DEFAULT current_timestamp,
    updatedAt datetime DEFAULT current_timestamp,
    deletedAt datetime null,

    forgein key (userId) references users(id),
    forgein key (folderId) references folders(id) ON DELETE CASCADE


## folders
    id char(36) primary key not null,
    userId char(36) not null,

    name varchar(100) not nul,
    totalAccounts INT DEFAULT 0,

    isPinned boolean DEFAULT false,
    isDeleted boolean DEFAULT false,

    createdAt datetime DEFAULT current_timestamp,
    updatedAt datetime DEFAULT current_timestamp,
    deletedAt datetime null,

    forgein key (userId) references users(id) ON DELETE CASCADE