export default class Subcontractor {
	constructor(id, fullName, qualification, experience, phone, email, salary, birthDate) {
		if(!id) throw new Error()
		this.id = id; this.fullName = fullName; this.qualification = qualification;
		this.experience = experience; this.phone = phone; this.email = email;
		this.salary = salary; this.birthDate = birthDate;
	}
	toString() { 
		return `${this.id};${this.fullName};${this.qualification};${this.experience};` +
		`${this.phone};${this.email};${this.salary};${this.birthDate}\n`
	}
}