const DEFAULT_PARAMS = {
    type : 'all',
    order : 'asc',
    sort : 'createdAt',
    query : '',
    limit : 10,
    page : 1
}

const DEFAULT_ACCOUNT = {
    applicationName : '',
    username : '',
    email : '',
    password : '',
    note : '',
    url : '',
    owner : '',
    folderId : null
}

const VALID_SORT = [
    'createdAt',
    'updatedAt',
    'deletedAt'
];

const VALID_ORDER = [
    'asc',
    'desc'
];

const MAX_FOLDER_NAME_LENGTH = 100;
const MAX_APPLICATION_NAME_LENGTH = 100;

export {
    DEFAULT_PARAMS,
    DEFAULT_ACCOUNT,
    VALID_ORDER,
    VALID_SORT,
    MAX_APPLICATION_NAME_LENGTH,
    MAX_FOLDER_NAME_LENGTH
}