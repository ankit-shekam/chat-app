// help us manage users (joining in, signing out, adding users, removing users) 

// in begining users is an empty array
const users = [];       


const addUser = ({ id, name, room }) => {
	// convert to all lower case(toLowerCase) and as oneword(trim)
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

	// if the username current user tried to login with is already taken or not
	const existingUser = users.find((user) => user.room === room && user.name === name);
	if(existingUser){
		return { error: 'Username is already taken please try something new' };
	}

	// if user forgot inputting some value(both name and room are required)
  if(!name || !room) return { error: 'Both username and room are required.' };

	// if all well till now, then create user, push it to the array of users and return the user just created
  const user = { id, name, room };
  users.push(user);
  return { user };
}



const removeUser = (id) => {
	// search for a user with given id in the users array
  const index = users.findIndex((user) => user.id === id);

	// if user found(index != -1) then remove that user from the users array (using splice function)
  if(index !== -1) {
		return users.splice(index, 1)[0];
	}
}



const getUser = (id) => {
  return users.find((user) => user.id === id)
}



const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };