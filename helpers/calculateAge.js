function calculateAge (birth_date) {
    const birthYear = new Date(birth_date).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

module.exports = calculateAge;