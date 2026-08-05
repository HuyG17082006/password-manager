const USERNAME = {
    max_length: 50,
    min_length: 8,
    regex: /^[A-Za-z0-9_]{8,50}$/
};

const PASSWORD = {
    max_length: 64,
    min_length: 8,
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/
};

const EMAIL = {
  min_length: 5,
  max_length: 320,
  regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
}



export {
    USERNAME,
    EMAIL,
    PASSWORD
}