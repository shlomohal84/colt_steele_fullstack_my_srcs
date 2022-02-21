// db.dogs.insert([{name:"Wyatt", age:14, breed:"Golden",isCatFriendly:false},{name:"Tonya",age:17,breed: "Chihuahua",isCatFriendly:true}])

const dbTemplate = [
		{
			"_id": `ObjectId("6152fc60c4faf34d333bdb07")`,
			"name": "Belle",
			"age": 7,
			"breed": "Canaan-Labrador",
			"personality": {
				"catFriendly": true,
				"dogFriendly": true, "kidFriendly": true
			},
			"size": "M"
		},

		{
			"_id": `ObjectId("6152fc9ac4faf34d333bdb08")`,
			"name": "Soul",
			"age": 13,
			"breed": "Cane Corso-Labrador",
			"personality": {
				"catFriendly": true,
				"dogFriendly": false,
				"kidFriendly": true
			},
			"size": "L"
		}
]

console.log(dbTemplate);